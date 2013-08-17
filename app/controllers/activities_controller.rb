class ActivitiesController < ApplicationController
  def index
    user = User.find_by_name(params[:member_name])
    course = Course.where(:user_id => user.id, :name => params[:course_name]).first
    @activities = Activity.where(course_id: course.id).order("created_at desc")
  end
end
