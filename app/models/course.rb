class Course < ActiveRecord::Base
  has_many :comments
  attr_accessible :cat, :description, :name
end
