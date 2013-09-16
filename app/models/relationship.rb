class Relationship < ActiveRecord::Base
  attr_accessible :followed_user_id, :follower_id
end
