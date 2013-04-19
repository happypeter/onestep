class Course < ActiveRecord::Base
  has_many :videos
  belongs_to :user
  attr_accessible :cat, :description, :name, :title, :poster, :user_id
  validates_presence_of :title, :name

  mount_uploader :poster, PosterUploader
end
