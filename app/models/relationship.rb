class Relationship < ActiveRecord::Base
  attr_accessible :followed_user_id, :follower_id

  belongs_to :follower, :class_name => "User"
  belongs_to :followed_user, :class_name => "User"
end
