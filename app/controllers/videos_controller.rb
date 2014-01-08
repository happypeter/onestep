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
    video_path ="#{Rails.root.to_s}/public#{video.asset_url}"
    send_file video_path,
              :filename => video.filename,
              :type => "video/quicktime",
              :disposition => 'attachment'
  end
end
