class Comment < ActiveRecord::Base
  attr_accessible :content, :video_id, :user_id
  belongs_to :user
  belongs_to :video
end
