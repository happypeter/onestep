# encoding: utf-8

class PosterUploader < CarrierWave::Uploader::Base

  include UploaderHelper

  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::RMagick

  # process :resize_to_fit => [310, 175]

  # large
  POSTER_LW = 500
  POSTER_LH = 500
  # normal
  POSTER_NW = 310
  POSTER_NH = 175

  # make the image same size with the one inside modal so we could get the right image size
  # The two values of POSTER_LW and POSTER_LH are equal to max-width and max-height separately
  # inside .poster-crop-box img in course.css.scss
  process :resize_to_fit => [POSTER_LW, POSTER_LH], :if => :large_image?
  # then we can crop base on the right image size
  process :crop

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

  def large_image? file
    if @file
      img = ::Magick::Image::read(@file.file).first
      return img.rows > POSTER_LW || img.columns > POSTER_LH
    end
  end
   # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    Settings.image.default_poster
  end
  def store_dir
    "uploads/poster/"
  end
end
