class Comment < ActiveRecord::Base
  attr_accessible :content, :commentable_id, :commentable_type, :user_id

  belongs_to :user
  belongs_to :video
  belongs_to :commentable, :polymorphic => true
  has_many   :notifications, :as => :notifiable, :dependent => :destroy

  after_create :send_notification_to_commenters

  private
  def here_users
    all = []
    self.commentable.comments.each { |c| all << c.user }
    all << self.commentable.user
    all.uniq
  end

  def send_notification_to_commenters
    here_users.each { |u| Notification.notify(u, self, self.user, "comment") if u.id != self.user.id }
  end
end
