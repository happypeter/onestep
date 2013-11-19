class Activity < ActiveRecord::Base
  attr_accessible :action, :trackable, :course_id

  belongs_to :user
  belongs_to :course
  belongs_to :trackable, polymorphic: true

  scope :within_range, ->(args){ where(created_at: (args - 30.days)..args) }

  after_create :send_notification_to_watchers

  def send_notification_to_watchers
    return false if self.trackable_type != "Video"
    course = Course.find_by_id(self.course_id)
    course.watchers.each do |u|
      Notification.notify u, self, course.user, self.action
    end
  end
end
