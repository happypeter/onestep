class Comment < ActiveRecord::Base
  attr_accessible :content, :course_id, :user_id
  belongs_to :user
  belongs_to :course
end
