class Video < ActiveRecord::Base
  belongs_to :course
  has_many :comments
  attr_accessible :title, :link, :course_id, :no, :desc
end
