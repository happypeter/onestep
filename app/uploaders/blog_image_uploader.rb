# encoding: utf-8

class BlogImageUploader < CarrierWave::Uploader::Base
  include UploaderHelper
  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::MiniMagick

  process :resize_to_limit => [570, 570]

  def store_dir
    "uploads/blog_image"
  end

  def extension_white_list
     %w(jpg jpeg gif png)
  end
end
