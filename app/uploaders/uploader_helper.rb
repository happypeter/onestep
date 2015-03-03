require 'digest'
require 'carrierwave/processing/mime_types'

module UploaderHelper
  def cache_dir
    "/tmp"
  end

  def filename
    if original_filename.present?
      hashed_name = Digest::MD5.hexdigest(File.dirname(current_path))[5..15]
      "#{hashed_name}.#{file.extension}"
    end
  end
end
