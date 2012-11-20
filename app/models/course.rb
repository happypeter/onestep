class Course < ActiveRecord::Base
  has_many :comments
  attr_accessible :cover, :description, :name
end
