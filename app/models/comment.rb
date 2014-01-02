class Comment < ActiveRecord::Base
  attr_accessible :content, :video_id, :user_id
  belongs_to :user
  belongs_to :video

  after_create :send_notification_to_commenters

  private
  def here_users
    all = []
    self.video.comments.each { |c| all << c.user }
    all << self.video.user
    all.uniq
  end

  def send_notification_to_commenters
    here_users.each { |u| Notification.notify(u, self, self.user, "comment") if u.id != self.user.id }
  end
end
