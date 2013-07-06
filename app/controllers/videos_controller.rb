class VideosController < ApplicationController
  def create
    respond_to do |f|
      f.html do
          redirect_to_target_or_default root_url
      end
      f.js do
        @video = Video.new(params[:video])
        @video.course_id = params[:course_id]
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

  def sort
    params[:video].each_with_index do |id, index|
      Video.update_all({position: index+1}, {id: id})
    end
    render nothing: true
  end

  def destroy
    video = Video.find(params[:id])
    video.destroy
    redirect_to edit_course_path(video.course)
  end
end
