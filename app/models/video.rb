class Video < ActiveRecord::Base
  attr_accessible :user_id, :title, :course_id, :position, :desc, :free, :asset, :ratio

  belongs_to :user
  belongs_to :course, :touch => true

  has_many :comments, dependent: :destroy
  has_many :activities, as: :tackable

  acts_as_list scope: :course

  mount_uploader :asset, VideoUploader

  before_create :set_metadata

  def open_to_user?(user)
     return true if user == self.user
     return true if self.free?
     false
  end

  def set_ratio
    out = `ffmpeg -i #{asset_url} 2>&1`
    if out =~ /([\d]+x[\d]+)/
      a = $1.split('x')
      return ratio = a[0].to_f / a[1].to_f
    end
  end

  private
  def set_metadata
    self.content_type = asset.file.content_type
    self.size = asset.file.size
    self.filename = asset.file.original_filename
    self.ratio = set_ratio
  end
end
