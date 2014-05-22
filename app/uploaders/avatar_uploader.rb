# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base
  include UploaderHelper

  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick

  # large
  AVATAR_LW = 300
  AVATAR_LH = 300
  # normal
  AVATAR_NW = 172
  AVATAR_NH = 172

  process :resize_and_pad => [AVATAR_LW, AVATAR_LH, "white"], :if => :large_image?
  process :crop

  def crop
    return unless model.cropping?
    manipulate! format: "png" do |img|
      x = model.crop_x.to_i
      y = model.crop_y.to_i
      w = model.crop_w.to_i
      h = model.crop_h.to_i
      img = img.crop(x, y, w, h)
      img
    end
  end

  def large_image? file
    if @file
      img = ::Magick::Image::read(@file.file).first
      return img.rows > AVATAR_LW || img.columns > AVATAR_LH
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
