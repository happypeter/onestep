# encoding: utf-8

class VideoUploader < CarrierWave::Uploader::Base
  include UploaderHelper
  storage :file
  def store_dir
    "course/"
  end
end
