class VideosController < ApplicationController
  load_and_authorize_resource

  def update
    respond_to do |format|
      if @video.update_attributes(params[:video])
        redirect_to("/courses/" + @video.course.name, :notice => 'Video info was successfully updated.')
      else
        redirect_to("/courses/" + @video.course.name, :notice => 'failed')
      end
    end
  end

  def create
    video = Video.new(params[:video])
    if video.save
       redirect_to("/courses/" + @video.course.name, :notice => 'Video created.')
    else
       redirect_to("/courses/" + @video.course.name, :notice => 'failed')
    end
  end
end
