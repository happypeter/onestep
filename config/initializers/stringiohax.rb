# define class that extends IO with methods that are required by carrierwave
  class CarrierStringIO < StringIO
    def original_filename
      # the real name does not matter
      "photo.png"
    end

    def content_type
      # real content type, "image/png" or "image/jpeg"
      # data.match(/data:(.*);/)[1]
      "image/png"
    end
  end
