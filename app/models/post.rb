class Post < ActiveRecord::Base
  attr_accessible :content, :title
  belongs_to :user

  scope :recent, order('id DESC')
end
