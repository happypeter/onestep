class Video < ActiveRecord::Base
  attr_accessible :user_id, :title, :course_id, :position, :desc, :free, :asset, :ratio

  belongs_to :user
  belongs_to :course, :touch => true

  has_many :comments, :as => :commentable, :dependent => :destroy
  has_many :activities, :as => :trackable

  acts_as_list scope: :course

  def open_to_user?(user)
     return true if user == self.user
     return true if self.free?
     false
  end
end
