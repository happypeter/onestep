class Video < ActiveRecord::Base
  attr_accessible :user_id, :title, :course_id, :position, :desc, :free, :asset, :ratio

  belongs_to :user
  belongs_to :course, :touch => true

  has_many :comments, dependent: :destroy
  has_many :activities, as: :tackable

  acts_as_list scope: :course

  mount_uploader :asset, VideoUploader

  before_create :set_metadata
  before_update :set_metadata

  def open_to_user?(user)
     return true if user == self.user
     return true if self.free?
     false
  end

  def set_ratio
    if self.new_record?
      # creating a video, asset_url is '/tmp/xxxx/xxx.mov'
      path = asset_url
    else
      #updating a video, asset_url is '/uploads/xxx.mov'
      path = File.join(Rails.root, "public", asset_url)
    end
    out = `ffmpeg -i #{path} 2>&1`
    if out =~ /(\b[\d]{3,4}x[\d]{3,4}\b)/
      a = $1.split('x')
      a[0].to_f / a[1].to_f
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
