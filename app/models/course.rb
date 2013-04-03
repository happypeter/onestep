class Course < ActiveRecord::Base
  has_many :videos
  belongs_to :user
  attr_accessible :cat, :description, :name, :title, :poster, :user_id

  mount_uploader :poster, PosterUploader
end
