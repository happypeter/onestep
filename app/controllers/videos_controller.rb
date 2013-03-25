class VideosController < ApplicationController
  load_and_authorize_resource

  def create
    video = Video.new(params[:video])
    if video.save
       redirect_to course_path(video.course)
    else
       redirect_to course_path(video.course)
    end
  end
end
