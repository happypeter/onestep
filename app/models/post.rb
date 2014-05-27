class Post < ActiveRecord::Base
  attr_accessible :content, :title, :name

  belongs_to :user

  has_many :comments, :as => :commentable, :dependent => :destroy

  scope :recent, -> { order('id DESC') }

  def to_param
  # post_path(@post), will become blog/0112-good-news
    "#{id} #{name}".parameterize
  end
end
