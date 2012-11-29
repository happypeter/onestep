class CoursesController < ApplicationController
  load_and_authorize_resource
  def new
  end

  def index
  end

  def show
    @course = Course.find_by_name(params[:name])
    if @course.nil?
      redirect_to(:root, :notice => 'No such course')
    end
    if params[:no].present?
      @video = Video.where(:course_id => @course.id,:no => params[:no].to_i).first
    elsif @course.videos.empty?
      @video = nil
    else
      @video = Video.where(:course_id => @course.id,:no => 0).first
    end
    session[:return_to] = request.url
  end

  def edit
  end

  def update
    respond_to do |format|
      if @course.update_attributes(params[:course])
        format.html { redirect_to(@course, :notice => 'Course was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def create
    course = Course.new(params[:course])
    if course.save
      redirect_to :root, :notice => "New course created successfully!"
    else
      redirect_to :root, :notice => "Failed to creat new course!"
    end
  end
end
