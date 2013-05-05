class CoursesController < ApplicationController
  load_and_authorize_resource
  def new
    @course = Course.new(:user_id => current_user.id)
    session[:return_to] = request.url
  end

  def index
    @courses = Course.where(public: true).reverse
    @course_groups = []
    @courses.each_index do |i|
      if i%3 == 0
        @course_groups << @courses[i..i+2]
      end
    end
  end

  def show
    user = User.find_by_name(params[:member_name])
    @course = Course.where(:user_id => user.id, :name => params[:course_name]).first
    if @course.nil?
      redirect_to(:root, :notice => 'No such course')
    else
      if params[:position].present?
        @video = Video.where(:course_id => @course.id,:position => params[:position].to_i).first
      elsif @course.videos.empty?
        @video = nil
      else
        @video = Video.where(:course_id => @course.id,:position => 1).first
      end
      session[:return_to] = request.url
    end
  end

  def edit
    user = User.find_by_name(params[:member_name])
    @course = Course.where(:user_id => user.id, :name => params[:course_name]).first
    session[:return_to] = request.url
  end

  def update
    @course = Course.where(:user_id => params[:course][:user_id], :name => params[:course][:name]).first
    @course.update_attributes(params[:course])
    @course.name = PinYin.of_string(params[:course][:title]).join('-').downcase
    respond_to do |format|
      if @course.save
        format.html { redirect_to course_path(@course), :success => 'Course was successfully updated.' }
      else
        format.html { render :action => "edit" }
      end
    end
  end
  def edit_video
    respond_to do |format|
      format.js {
        user = User.find_by_name(params[:member_name])
        course = Course.where(:user_id => user.id, :name => params[:course_name]).first
        @video = Video.where(:course_id => course.id, :position => params[:position]).first
      }
    end
  end
  def update_poster
    @course = Course.find(params[:course_id])
    respond_to do |format|
      format.js do
        @course.update_attributes(params[:course])
      end
    end
  end

  def create
    user = User.find(params[:course][:user_id])
    title = params[:course][:title]
    name = PinYin.of_string(title).join('-').downcase
    user.courses.each do |c|
      if c.name == name
        @name_exsits = true
      end
    end
    if defined? @name_exsits
      redirect_to_target_or_default :root, :notice => "You already created this course"
      return
    end
    course = Course.new(params[:course])
    course.name = name
    if course.save
      redirect_to edit_course_path(course), :notice => "New course created successfully!"
    else
      redirect_to_target_or_default :root, :notice => "Failed to creat new course!"
    end
  end
  def destroy
    user = User.find_by_name(params[:member_name])
    course = Course.where(:user_id => user.id, :name => params[:course_name]).first
    course.destroy
    redirect_to member_path(user.name)
  end
end
