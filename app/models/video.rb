class Video < ActiveRecord::Base
  belongs_to :course
  has_many :comments
  attr_accessible :user_id, :title, :course_id, :no, :desc
  belongs_to :user
  attr_accessible :asset


  mount_uploader :asset, VideoUploader
  before_create :set_metadata
  private
  def set_metadata
    self.content_type = asset.file.content_type
    self.size = asset.file.size
    self.filename = asset.file.original_filename
  end

end
