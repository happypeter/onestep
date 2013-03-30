class UpyunVideosController < ApplicationController
  def new
    @upyun_video = UpyunVideo.new
  end
  def show
    @video = UpyunVideo.find(params[:id])
  end

  def create
    file = params[:upyun_video][:asset]
    video = UpyunVideo.new(params[:upyun_video])
    video.filename = file.original_filename
    video.user = current_user
    if video.save
      redirect_to upyun_video_path(video)
    else
      redirect_to new_upyun_video_path
    end
  end
end
