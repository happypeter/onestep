class Collaborating < ActiveRecord::Base
  attr_accessible :course_id, :user_id

  belongs_to :course
  belongs_to :user
end
