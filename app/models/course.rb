class Course < ActiveRecord::Base
  has_many :videos, order: :position
  has_many :orders
  belongs_to :user
  attr_accessible :description, :name, :title, :poster, :user_id, :public,
                  :price
  validates_presence_of :title, :price

  mount_uploader :poster, PosterUploader

  scope :pub, where(public: true)
end
