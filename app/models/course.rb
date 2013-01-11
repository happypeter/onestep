class Course < ActiveRecord::Base
  has_many :comments
  has_many :videos
  attr_accessible :cat, :description, :name, :title, :poster_url

  def has_poster?
    self.read_attribute(:poster_url).present?
  end
  def to_param
  # course_path(@course), will become /0112-good-news
  "#{id.to_s.rjust(4, '0')} #{name}".parameterize
  end
end
