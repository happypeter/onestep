class Comment < ActiveRecord::Base
  attr_accessible :content, :video_id, :user_id
  belongs_to :user
  belongs_to :video
  has_many :notifications

  after_create :send_notifications

  private
  def here_users
    all = []
    self.video.comments.each do |c|
      all << c.user
    end
    all << self.video.user
    all.uniq
  end
  def send_notifications
    here_users.each do |u|
      Notification.create(user_id: u.id, comment_id: self.id) unless u.id == self.user_id
    end
  end
end
