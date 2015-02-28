class Video < ActiveRecord::Base
  attr_accessible :user_id, :title, :course_id, :position, :desc, :free, :asset, :ratio

  belongs_to :user
  belongs_to :course, :touch => true

  has_many :comments, :as => :commentable, :dependent => :destroy
  has_many :activities, :as => :trackable

  acts_as_list scope: :course

  before_update :set_metadata

  def open_to_user?(user)
     return true if user == self.user
     return true if self.free?
     false
  end

  def set_ratio
    # out = `ffmpeg -i #{asset_url} 2>&1`
    # if out =~ /(\b[\d]{3,4}x[\d]{3,4}\b)/
    #   a = $1.split('x')
    #   a[0].to_f / a[1].to_f
    # end
    `mediainfo '--Inform=Video; %DisplayAspectRatio%' #{asset_url}`
  end

  private
  # uploading a video, asset_url = '/tmp/xxx/xxx.mov'
  # when video is created, asset_url = '/uploads/xxxx.mov'
  def set_metadata
    if asset_url.split('/')[1] != 'uploads'
      # the above is used to check if you are uploading a new video or not
      self.content_type = asset.file.content_type
      self.size = asset.file.size
      self.filename = asset.file.original_filename
      self.ratio = set_ratio
    end
  end
end
