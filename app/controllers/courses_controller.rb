class CoursesController < ApplicationController
  load_and_authorize_resource
  def new
    @course = Course.new(:user_id => current_user.id)
  end

  def index
    @courses = Course.all.reverse
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
      if params[:video_no].present?
        @video = Video.where(:course_id => @course.id,:no => params[:video_no].to_i).first
      elsif @course.videos.empty?
        @video = nil
      else
        @video = Video.where(:course_id => @course.id,:no => 0).first
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
    respond_to do |format|
      if @course.update_attributes(params[:course])
        format.html { redirect_to course_path(@course), :success => 'Course was successfully updated.' }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def create
    course = Course.new(params[:course])
    if course.save
      redirect_to edit_course_path(course), :notice => "New course created successfully!"
    else
      redirect_to_target_or_default :root, :notice => "Failed to creat new course!"
    end
  end
end
