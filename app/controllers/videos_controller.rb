class VideosController < ApplicationController
  def create
    respond_to do |f|
      f.js do
        @video = Video.new
        @video.asset = params[:key]
        @video.size = params[:fsize]
        @video.filename = params[:fname]
        @video.content_type = params[:mimeType]
        @video.course_id = params[:custom_fields][:course_id]
        @video.ratio =  params[:avinfo][:width].to_f / params[:avinfo][:height].to_f
        @video.user_id = current_user.id
        @video.save
        track_activity @video, @video.course.id
      end
    end
  end

  def update
    video = params[:id] ? Video.find(params[:id]) : Video.find(params[:video][:id])
    respond_to do |f|
      if params[:etag].present?
        old_asset = video.asset
        new_asset = params[:key]
        if old_asset != new_asset
          video.asset = params[:key]
          video.size = params[:fsize]
          video.filename = params[:fname]
          video.content_type = params[:mimeType]
          video.ratio =  params[:avinfo][:width].to_f / params[:avinfo][:height].to_f
          video.save
          track_activity video, video.course.id
        end
        f.json { render :json => {} }
      else
        video.update_attributes(params[:video])
        f.html do
          redirect_to_target_or_default root_url
        end
      end
    end
  end

  def sort
    params[:video].each_with_index do |id, index|
      Video.update_all({position: index + 1}, {id: id})
    end
    render nothing: true
  end

  def destroy
    video = Video.find(params[:id])
    track_activity video, video.course.id
    destroy_notifications video
    video.destroy
    redirect_to edit_course_path(video.course)
  end

  def download
    video_path = "http://#{Settings.qiniu.bucket_domain}/#{params[:asset]}"
    redirect_to video_path
  end
end
