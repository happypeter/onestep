class ActivitiesController < ApplicationController
  def index
    @activities = Activity.where(course_id: params[:course_id]).order("created_at desc")
  end
end
