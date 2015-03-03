# encoding: utf-8

class PosterUploader < CarrierWave::Uploader::Base
  include UploaderHelper
  include CarrierWave::MimeTypes
  process :set_content_type

  # Include RMagick or MiniMagick support:
  include CarrierWave::MiniMagick

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
      img.crop("#{w}x#{h}+#{x}+#{y}")
      img
    end
  end

  def large_image? file
    if @file
      width, height = ::MiniMagick::Image.open(@file.file)[:dimensions]
      width > POSTER_LW || height > POSTER_LH
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
