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
  self.upyun_bucket = Settings.upyun.avatar_bucket
  self.upyun_bucket_domain = Settings.upyun.avatar_bucket_domain

  process :resize_to_fit => [420, 420]

  def store_dir
    "avatar/"
  end
end
