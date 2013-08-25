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

  process :crop
  process :resize_to_fit => [AVATAR_LW,AVATAR_LH]

  def crop
    return unless model.cropping?
    manipulate! do |img|
      x = model.crop_x.to_i
      y = model.crop_y.to_i
      w = model.crop_w.to_i
      h = model.crop_h.to_i
      img = img.crop(x, y, w, h)
      img
    end
  end

  def get_version(version = :original)
    current_version = self.current_path
    other_version = File.dirname(current_version) + "/" + version.to_s + "_" + File.basename(current_version)

    final_version = (version == :original) ? current_version : other_version
  end

  def get_geometry(version = :original)
    img = Magick::Image::read(get_version(version)).first
    @geometry = { :width => img.columns, :height => img.rows }
  end

   # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    Settings.image.default_avatar
  end
  def store_dir
    "uploads/avatar/"
  end
end
