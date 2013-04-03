# encoding: utf-8

class UpyunImageUploader < CarrierWave::Uploader::Base
  include UploaderHelper

  include CarrierWave::RMagick
  storage :upyun

  self.upyun_username = Settings.upyun.operator_name
  self.upyun_password = Settings.upyun.operator_password
  self.upyun_bucket = Settings.upyun.bucket
  self.upyun_bucket_domain = Settings.upyun.bucket_domain

  process :resize_to_limit => [570, 0]
  def store_dir
    "uploads/"
  end
  def extension_white_list
     %w(jpg jpeg gif png)
  end

end
