class BlogImagesController < ApplicationController
  def create
    respond_to do |f|
      f.json {
        result = []

        params[:blog_image][:asset].each do |file|
          img = BlogImage.new(:asset => file)
          img.filename = file.original_filename
          img.user = current_user
          if img.save
            result << {
              :name => file.original_filename,
              :size => img.size,
              :url => img.asset.url,
              :thumbnail_url => img.asset.url,
              :delete_url => blog_image_path(img),
              :delete_type => 'DELETE'
            }
          end
        end

        render :json => result
      }
    end
  end
end
