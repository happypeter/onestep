class ActivitiesController < ApplicationController
  def index
    user = User.find_by_name(params[:member_name])
    course = Course.where(user_id: user.id, name: params[:course_name]).first
    @groups = []
    @date = []
    activities = Activity.where(course_id: course.id).reverse
    first = activities.first.created_at
    date = Time.zone.now
    while first < date do
      group = Activity.where(course_id: course.id).within_range(date).reverse
      if group.present?
        @groups << group
        @date << date
      end
      date -= 30.days
    end
    @date << date
  end

  def timeline
    @groups = []
    @date = []
    first = Activity.first.created_at
    date = Time.zone.now
    while first < date do
      group = Activity.within_range(date).reverse.group_by(&:course_id)
      if group.present?
        @groups << group
        @date << date
      end
      date -= 30.days
    end
    @date << date
  end
end
