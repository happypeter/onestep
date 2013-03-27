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
    @user   = User.find_by_name(current_user.name)
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

  def create
    @user = User.new(params[:user])
    user_exist = User.find_by_name(@user.name)
    black_list = ["write_blog", "submit_login_form", "account", "blog", "explore", "signup", "login", "about"]

    if black_list.include?(params[:user][:name])
      redirect_to "/signup" , :notice => "用户名已经存在"
      return
    end

    if user_exist
      redirect_to "/signup" , :notice => "用户名已经存在"
      return
    end

    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to member_path(@user.name), :notice => "signed up!"
    else
      render "signup"
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
    respond_to do |format|
      format.html # show.html.erb
    end
  end
end

