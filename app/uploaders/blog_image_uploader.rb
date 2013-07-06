# encoding: utf-8

class BlogImageUploader < CarrierWave::Uploader::Base
  include UploaderHelper

  include CarrierWave::RMagick
  process :resize_to_limit => [570, 0]
  def store_dir
    "uploads/blog_image"
  end
  def extension_white_list
     %w(jpg jpeg gif png)
  end

end
