class UsersController < ApplicationController  
  #  FIXME: still need to implement "edit" "index" ...
  def login_form
    @user = User.new
  end

  def signup
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])  
  end

  def update
    @user = User.find(params[:id])  
    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to(@user, :notice => 'Profile was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @post.errors, :status => :unprocessable_entity }
      end
    end
  end  

  def create 
    @user = User.new(params[:user])
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to user_path(@user), :notice => "signed up!"
    else
      render "signup"
    end
  end

  def login
    user = User.find_by_email(params[:email])  
    if user && user.authenticate(params[:password])
      cookies.permanent[:token] = user.token
      redirect_to root_url
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
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def show
    @user = User.find(params[:id])
    if @user == nil
      redirect_to root_url, :notice => "no such user!"  
    else
      respond_to do |format|
        format.html # show.html.erb
      end
    end
  end
end

