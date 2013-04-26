#coding:utf-8
class UsersController < ApplicationController
  load_and_authorize_resource

  def login_form
    @user = User.new
  end

  def signup
    @user = User.new
  end

  def edit
    @user = User.find_by_name(current_user.name)
    respond_to do |format|
      format.html # edit.html.erb
    end
  end

  def update
    @user   = User.find_by_name(params[:user][:name])
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(member_path(@user.name), :notice => 'Profile was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def update_avatar
    respond_to do |format|
      format.js do
        @user = current_user
        @user.update_attributes(params[:user])
      end
    end
  end

  def create
    @user = User.new(params[:user])
    user_exist = User.find_by_name(@user.name)
    email_exist = User.find_by_email(@user.email)
    black_list = ["write_blog", "submit_login_form", "account", "blog", "explore", "signup", "login", "about"]

    if black_list.include?(params[:user][:name])
      flash[:error] = "Reserved Word!"
      redirect_to :root
      return
    end

    if user_exist
      flash[:error] = "Name Taken!"
      redirect_to :root
      return
    end
    if email_exist
      flash[:alert] = "Email Taken!"
      redirect_to :root
      return
    end

    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to member_path(@user.name), :notice => "signed up!"
    else
      flash[:notice] = "Fields can not be blank!"
      redirect_to :root
    end
  end

  def login
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to_target_or_default root_url
    else
      flash.alert = "Invalid name or password"
      redirect_to :action => "login_form"
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to root_url, :notice => "You have been logged out."
  end

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def show
    @user = User.find_by_name(params[:member_name])
    if @user.nil?
      raise ActiveRecord::RecordNotFound
    end
    respond_to do |format|
      format.html # show.html.erb
    end
    session[:return_to] = request.url
  end
end

