class Course < ActiveRecord::Base
  has_many :comments
  has_many :videos
  attr_accessible :cat, :description, :name, :title, :poster_url

  def has_poster?
    self.read_attribute(:poster_url).present?
  end
end
