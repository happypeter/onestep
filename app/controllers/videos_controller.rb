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
    if params[:id]
      video = Video.find(params[:id])
    else
      video = Video.find(params[:video][:id])
    end
    old_asset = video.asset.to_s.split('/').last
    video.update_attributes(params[:video])
    new_asset = video.asset.to_s.split('/').last
    track_activity video, video.course.id if old_asset != new_asset

    respond_to do |f|
      f.html do
          redirect_to_target_or_default root_url
      end
      f.json { render :json => {} }
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
    video = Video.find_by_asset("#{params[:serial]}.#{params[:type]}")
    video_path = "http://7u2myb.com1.z0.glb.clouddn.com/#{video.asset_url.split('/').last}"
    redirect_to video_path
  end
end
