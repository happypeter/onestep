class UsersController < ApplicationController
  before_filter :auth, only: [:signup, :login_form]

  def login_form
    @user = User.new
  end

  def signup
    @user = User.new
  end

  def edit
    @user = User.find_by_name(current_user.name) if current_user
    if @user.nil?
      redirect_to_target_or_default :root, :notice => "login first plz"
      return
    end
    respond_to do |format|
      format.html # edit.html.erb
    end
  end

  def update
    @user = User.find_by_name(params[:user][:name])
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

    if params[:user][:name].empty? || \
       params[:user][:email].empty? || \
       params[:user][:password].empty?

      flash[:notice] = t('fields_can_not_be_blank')
      redirect_to :signup
      return
    end


    if black_list.include?(params[:user][:name])
      flash[:notice] = "#{params[:user][:name]}" + t('is_reserved_word')
      redirect_to :signup
      return
    end

    if user_exist
      flash[:notice] = t('name_taken')
      redirect_to :signup
      return
    end
    if email_exist
      flash[:notice] = t('email_taken')
      redirect_to :signup
      return
    end

    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to member_path(@user.name), :notice => t('signed_up')
    else
      redirect_to :signup
      flash[:notice] = t('fail_save_user')
    end
  end

  def login
    user = User.find_by_name(params[:name])
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to_target_or_default root_url
    else
      flash[:notice] = t('invalid_name_or_password')
      redirect_to :action => "login_form"
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to root_url, :notice => t('logged_out')
  end

  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def show
    @user = User.find_by_name(params[:member_name])
    if @user.nil?
      raise ActiveRecord::RecordNotFound
    end
    @courses = if (@user == current_user)
      @user.courses
    else
      @user.courses.pub
    end

    @paid_courses = @user.paid_courses

    respond_to do |format|
      format.html # show.html.erb
    end
    session[:return_to] = request.url
  end
end

