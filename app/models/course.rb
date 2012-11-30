class Course < ActiveRecord::Base
  has_many :comments
  has_many :videos
  attr_accessible :cat, :description, :name, :title
end
