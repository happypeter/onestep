# encoding: utf-8

class VideoUploader < CarrierWave::Uploader::Base
  include UploaderHelper
  storage :upyun

  self.upyun_username = Settings.upyun.operator_name
  self.upyun_password = Settings.upyun.operator_password
  self.upyun_bucket = Settings.upyun.video_bucket
  self.upyun_bucket_domain = Settings.upyun.video_bucket_domain

end
