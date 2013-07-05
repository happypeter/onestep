class Notification < ActiveRecord::Base
  attr_accessible :user_id, :comment_id, :unread
  belongs_to :user
  belongs_to :comment
  scope :recent, order("created_at DESC")
end
