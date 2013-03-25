class Course < ActiveRecord::Base
  has_many :videos
  belongs_to :user
  attr_accessible :cat, :description, :name, :title, :poster_url, :user_id

  def has_poster?
    self.read_attribute(:poster_url).present?
  end
  def to_param
  # course_path(@course), will become /0112-good-news
  "#{id.to_s.rjust(4, '0')} #{name}".parameterize
  end
end
