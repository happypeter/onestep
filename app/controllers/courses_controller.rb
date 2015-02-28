# encoding: utf-8
class CoursesController < ApplicationController
  before_filter :check_owner, :only => [:edit, :update, :destory, :collaboration, :add_member, :delete_member]
  before_filter :find_course, :except => [:new, :index, :create, :update, :update_poster, :autocomplete_user_name]

  autocomplete :user, :name

  def new
    @course = Course.new(:user_id => current_user.id)
    session[:return_to] = request.url
  end

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
      session[:return_to] = request.url
    end
  end

  def edit
    session[:return_to] = request.url
  end

  def update
    @course = Course.find(params[:course][:id])
    @course.update_attributes(params[:course])
    @course.name = PinYin.of_string(params[:course][:title]).join('-').downcase
    respond_to do |format|
      if @course.save
        format.html { redirect_to course_path(@course), :success => 'Course was successfully updated.' }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def create
    user = User.find(params[:course][:user_id])
    title = params[:course][:title]
    name = PinYin.of_string(title).join('-').downcase
    user.courses.each do |c|
      if c.name == name
        @name_exsits = true
      end
    end
    if defined? @name_exsits
      redirect_to_target_or_default :root, :notice => "你已经创建了这门课程"
      return
    end
    course = Course.new(params[:course])
    course.name = name
    # get a random poster
    all_posters = Dir["app/assets/images/" + Settings.image.default_posters_dir + "*"]
    course.poster = open(all_posters[rand(all_posters.length)])
    if course.save
      track_activity course, course.id
      redirect_to edit_course_path(course), :notice => "新课程创建成功！"
    else
      redirect_to_target_or_default :root, :notice => "新课程创建失败！"
    end
  end

  def destroy
    destroy_notifications @course
    @course.destroy
    redirect_to member_path(@user.name)
  end

  def edit_video
    @video = Video.where(:course_id => @course.id, :position => params[:position]).first
    respond_to do |format|
      format.js
    end
  end

  def add_video
    respond_to do |format|
      format.js
    end
  end

  # PUT
  def update_poster
    @course = Course.where(:user_id => params[:course][:user_id], :name => params[:course][:name]).first
    dataurl = params[:course][:poster]

    # mothod to convert base64 image data url to binary image
    @course.image_data= dataurl

    @course.crop_x = params[:course][:crop_x]
    @course.crop_y = params[:course][:crop_y]
    @course.crop_w = params[:course][:crop_w]
    @course.crop_h = params[:course][:crop_h]
    @course.poster = @course.poster
    @course.save

    respond_to do |format|
      format.js
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
    if course.user != current_user
      redirect_to :root, :notice => "抱歉，只有课程所有者才有此权限"
      return
    end
  end
end
