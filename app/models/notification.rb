class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :executor, :class_name => 'User'
  belongs_to :notifiable, :polymorphic => true

  scope :recent, -> { order("created_at DESC") } 

  attr_accessible :action, :unread, :notifiable, :user, :executor

  def self.notify(user, notifiable, executor, unread = true, action)
    n = Notification.new user: user, notifiable: notifiable
    n.action = action
    n.unread = unread
    n.executor = executor
    n.save
  end
end
