# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base
  include UploaderHelper
  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::MiniMagick

  # large
  AVATAR_LW = 300
  AVATAR_LH = 300
  # normal
  AVATAR_NW = 172
  AVATAR_NH = 172

  process :resize_to_fit => [AVATAR_LW, AVATAR_LH], :if => :large_image?
  process :crop

  def crop
    return unless model.cropping?
    manipulate! do |img|
      x = model.crop_x.to_i
      y = model.crop_y.to_i
      w = model.crop_w.to_i
      h = model.crop_h.to_i
      img.crop("#{w}x#{h}+#{x}+#{y}")
      img
    end
  end

  # https://github.com/carrierwaveuploader/carrierwave/wiki/How-to:-Get-image-dimensions
  def large_image? file
    if @file
      width, height = ::MiniMagick::Image.open(@file.file)[:dimensions]
      width > AVATAR_LW || height > AVATAR_LH
    end
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    Settings.image.default_avatar
  end

  def store_dir
    "uploads/avatar/"
  end
end
