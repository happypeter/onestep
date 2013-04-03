# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base
  include UploaderHelper

  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick

  storage :upyun
  self.upyun_username = Settings.upyun.operator_name
  self.upyun_password = Settings.upyun.operator_password
  self.upyun_bucket = Settings.upyun.bucket
  self.upyun_bucket_domain = Settings.upyun.bucket_domain

  process :resize_to_fit => [420, 420]

   # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    Settings.image.default_avatar
  end
  def store_dir
    "avatar/"
  end
end
