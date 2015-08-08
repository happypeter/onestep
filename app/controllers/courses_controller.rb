# encoding: utf-8
class CoursesController < ApplicationController
  before_filter :check_owner, :only => [:edit, :update, :destory, :collaboration, :add_member, :delete_member]
  before_filter :find_course, :except => [:new, :index, :create, :update, :update_poster, :autocomplete_user_name]

  autocomplete :user, :name

  def index
    if params[:sort] == "time"
      @courses = Course.where(public: true).reverse
      @course_groups = []
      @courses.in_groups_of(3, false) { |group| @course_groups << group }
    elsif params[:sort] == "star"
      c_sorted = courses_sorted_by_star
      @course_groups = []
      c_sorted.in_groups_of(3, false) { |group| @course_groups << group }
    end
  end

  def show
    if @course.nil?
      redirect_to(:root, :notice => '抱歉，您访问的课程不存在')
    else
      if params[:position].present?
        @video = Video.where(:course_id => @course.id,:position => params[:position].to_i).first
      elsif @course.videos.empty?
        @video = nil
      else
        @video = Video.where(:course_id => @course.id,:position => 1).first
      end
      @video_link = Settings.video.store + @course.user.name + "/" + @course.name + "/" +  @video.position.to_s + ".mp4"
      session[:return_to] = request.url
    end
  end

  def watch
    @course.add_watcher(current_user)
    Notification.notify @course.user, @course, current_user, "watch"
    render :text => "1"
  end

  def unwatch
    @course.delete_watcher(current_user)
    render :text => "1"
  end

  def watchers
    @watchers = @course.watchers
  end

  def collaboration
    @collaborators = @course.collaborators
  end

  def add_member
    @member = User.find_by_name(params[:collab])
    if @course.user.id == @member.id
      @author_flag = true
      return
    end
    if @course.collaborators.include?(@member)
      @collab_flag = true
      return
    end
    @course.collaborators << @member
    respond_to do |format|
      format.js
    end
  end

  def delete_member
    @member = User.find_by_name(params[:collab])
    @course.collaborators.delete(@member)
    respond_to do |format|
      format.js
    end
  end

  private

  def find_course
    @user = User.find_by_name(params[:member_name])
    @course = Course.where(:user_id => @user.id, :name => params[:course_name]).first
  end

  def check_owner
    if current_user.nil?
      redirect_to :root, :notice => t('login_first_plz')
      return
    end
    if params[:course_name]
      user = User.find_by_name(params[:member_name])
      course = Course.where(:user_id => user.id, :name => params[:course_name]).first
    else
      # for update; find the proper course object when course title is blank
      course = Course.find(params[:course][:id])
    end
    if not (( current_user.admin? ) || (course.user == current_user))
      redirect_to :root, :notice => "抱歉，只有课程所有者或管理员才有此权限"
      return
    end
  end
end
