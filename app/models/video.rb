class Video < ActiveRecord::Base
  belongs_to :course
  attr_accessible :title, :link, :course_id, :no
end
