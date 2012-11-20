class CoursesController < ApplicationController
  load_and_authorize_resource
  def new
  end

  def index
  end

  def show
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
