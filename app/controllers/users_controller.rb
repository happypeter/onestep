# encoding:utf-8
class UsersController < ApplicationController
  layout 'users/edit', :only => [:edit, :edit_avatar]
  before_filter :redirect_to_root_if_logged_in, only: [:signup, :login]
  before_filter :check_login, :only => [:edit, :update, :update_avatar, :edit_avatar, 
                                        :restore_gravatar, :follow, :unfollow]

  def login
    @user = User.new
  end

  def signup
    @user = User.new
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(account_path, :notice => t('profile_updated')) }
      else
        flash[:notice]  = @user.errors.full_messages.first
        format.html { render :edit, layout: "users/edit" }
      end
    end
  end

  # PUT
  def update_avatar
    @user = current_user

    dataurl = params[:user][:avatar]

    # mothod to convert base64 image data url to binary image
    @user.image_data= dataurl

    @user.crop_x = params[:user][:crop_x]
    @user.crop_y = params[:user][:crop_y]
    @user.crop_w = params[:user][:crop_w]
    @user.crop_h = params[:user][:crop_h]
    @user.avatar = @user.avatar
    @user.use_gravatar = false
    @user.save

    respond_to do |format|
      format.js
    end
  end

  def edit_avatar
    @user = current_user
  end

  def restore_gravatar
    current_user.update_attribute(:use_gravatar, true) unless current_user.use_gravatar?

    redirect_to :edit_avatar
  end

  def create
    @user = User.new(params[:user])

    if @user.valid?
      @user.save!
      UserMailer.welcome(@user).deliver
      cookies.permanent[:token] = @user.token
      redirect_to member_path(@user.name), :notice => t('signed_up')
    else
      flash[:notice] = @user.errors.full_messages.first
      render :signup
    end
  end

  def create_login_session
    user = User.find_by(name: params[:login])
    user ||= User.find_by(email: params[:login])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to_target_or_default root_url
    else
      flash[:notice] = t('invalid_name_or_password')
      redirect_to :login
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to root_url, :notice => t('logged_out')
  end

  def index
    @count = User.all.count
    @users = User.order('id desc').page(params[:page]).per(60)
  end

  def show
    @user = User.find_by_name(params[:member_name])

    raise ActiveRecord::RecordNotFound if @user.nil?

    @courses = @user == current_user ? @user.courses : @user.courses.pub
    @watched_courses = @user == current_user ? @user.watched_courses : @user.watched_courses.pub
    @paid_courses = @user.paid_courses

    @activities = @user.activities.last(10).reverse

    session[:return_to] = request.url
  end

  def follow
    user = User.find_by_name(params[:member_name])
    current_user.follow!(user)
    render :text => "1"
  end

  def unfollow
    user = User.find_by_name(params[:member_name])
    current_user.unfollow!(user)
    render :text => "1"
  end
end
