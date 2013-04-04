class VideosController < ApplicationController
  load_and_authorize_resource

  def create
    redirect_to root_path if Settings.upyun.switch != 'on'
    respond_to do |f|
      f.html do
          redirect_to_target_or_default root_url
      end
      f.js do
        @video = Video.new(params[:video])
        @video.user_id = current_user.id
        @video.save
      end
    end
  end
  def update
    if params[:id]
      video = Video.find(params[:id])
    else
      video = Video.find(params[:video][:id])
    end
    video.update_attributes(params[:video])
    respond_to do |f|
      f.html do
          redirect_to_target_or_default root_url
      end
    end
  end
end
