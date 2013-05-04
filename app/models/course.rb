class Course < ActiveRecord::Base
  has_many :videos, order: :position
  belongs_to :user
  attr_accessible :description, :name, :title, :poster, :user_id, :public
  validates_presence_of :title

  mount_uploader :poster, PosterUploader
end
