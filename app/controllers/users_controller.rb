# encoding:utf-8
class UsersController < ApplicationController
  layout 'users/edit', :only => [:edit, :edit_avatar]
  before_filter :redirect_to_root_if_logged_in, only: [:signup, :login]

  def login
    @user = User.new
  end

  def signup
    @user = User.new
  end

  # PUT
  def crop
    @user = User.find_by_name(current_user.name) if current_user

    dataurl = params[:user][:avatar]

    # mothod to convert base64 image data url to binary image
    @user.image_data= dataurl

    @user.crop_x = params[:user][:crop_x]
    @user.crop_y = params[:user][:crop_y]
    @user.crop_w = params[:user][:crop_w]
    @user.crop_h = params[:user][:crop_h]
    @user.avatar = @user.avatar
    @user.save
    redirect_to edit_avatar_path, :notice => t('avatar_updated')
  end

  def edit
    @user = User.find_by_name(current_user.name) if current_user
    if @user.nil?
      redirect_to_target_or_default :root, :notice => t('login_first_plz')
      return
    end
  end

  def update
    @user = User.find_by_name(params[:user][:name])
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(account_path, :notice => t('profile_updated')) }
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

  def edit_avatar
    @user = current_user
  end

  def create
    @user = User.new(params[:user])

    black_list = %w(write_blog create_login_seesion account blog explore signup login about)

    if params[:user][:name].empty? ||
       params[:user][:email].empty? ||
       params[:user][:password].empty?

      flash[:notice] = t('fields_can_not_be_blank')
      redirect_to :signup
      return
    end

    user_name = @user.name
    if user_name.include?('-') ||
       user_name.include?(' ') ||
       user_name.include?('.') ||
       user_name.include?('/') ||
       user_name.include?('\\')
      flash[:notice] = "用户名不能包含横线, 斜线, 句点或空格"
      redirect_to :signup
      return
    end

    if black_list.include? user_name
      flash[:notice] = "#{user_name} #{t('is_reserved_word')}"
      redirect_to :signup
      return
    end

    if User.exists? name: user_name
      flash[:notice] = t('name_taken')
      redirect_to :signup
      return
    end

    if User.exists? email: @user.email
      flash[:notice] = t('email_taken')
      redirect_to :signup
      return
    end

    if @user.save
      UserMailer.welcome(@user).deliver
      cookies.permanent[:token] = @user.token
      redirect_to member_path(@user.name), :notice => t('signed_up')
    else
      redirect_to :signup
      flash[:notice] = t('fail_save_user')
    end
  end

  def create_login_session
    user = User.find_by_name(params[:name])
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
    @users = User.all.reverse
  end

  def show
    @user = User.find_by_name(params[:member_name])

    raise ActiveRecord::RecordNotFound if @user.nil?

    @courses = @user == current_user ? @user.courses : @user.courses.pub
    @watched_courses = @user == current_user ? @user.watched_courses : @user.watched_courses.pub
    @paid_courses = @user.paid_courses

    @activities = []
    @user.activities.reverse.each { |a| @activities << a if Course.find(a.course_id).public }

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
