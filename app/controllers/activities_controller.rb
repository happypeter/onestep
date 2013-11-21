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
    @author_count = 0
    @activity_count = 0
    Activity.all.collect(&:course_id).uniq.each do |c|
      if Course.find(c).public
        @author_count += 1
        @activity_count += Activity.where(course_id: c).count
      end
    end
    @groups = []
    @date = []
    first = Activity.first.created_at
    date = Time.zone.now
    while first < date do
      group = Activity.within_range(date).reverse.cluster{ |activity| activity.course_id}
      if group.present?
        @groups << group
        @date << date
      end
      date -= 30.days
    end
    @date << date
  end
end
