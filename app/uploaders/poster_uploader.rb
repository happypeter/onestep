# encoding: utf-8

class PosterUploader < CarrierWave::Uploader::Base

  include UploaderHelper

  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick

  process :resize_to_fit => [310, 175]

   # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    Settings.image.default_poster
  end
  def store_dir
    "uploads/poster/"
  end
end
