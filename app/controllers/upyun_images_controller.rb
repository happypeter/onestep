class UpyunImagesController < ApplicationController
  def new
    @upyun_image = UpyunImage.new
  end

  def show
    @img = UpyunImage.find(params[:id])
  end

  def create
    file = params[:upyun_image][:asset]
    image = UpyunImage.new(params[:upyun_image])
    image.filename = file.original_filename
    image.user = current_user
    if image.save
      redirect_to upyun_image_path(image)
    else
      redirect_to new_upyun_image_path
    end
  end
end
