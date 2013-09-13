class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :init

  def init
    set_locale_to_zh
    count_unread_notification
  end

  def set_locale_to_zh
    I18n.locale = cookies[:locale] || "zh-CN"
  end

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end

  helper_method :current_user # need this to access from the view

  def edit_course_path(course)
    "/" + course.user.name + "/" + course.name + "/edit"
  end

  helper_method :edit_course_path

  def course_path(course)
     "/" + course.user.name + "/" + course.name
  end
  helper_method :course_path

  def redirect_to_target_or_default(default, *options)
    redirect_to(session[:return_to] || default, *options)
    session[:return_to] = nil
  end

  def check_admin
    unless current_user && current_user.admin?
      redirect_to :root, :notice => "Only admin can do this."
    end
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    case request.format.to_sym
    when :html
      redirect_to "/404"
    when :js
      redirect_to "/404"
    end
  end

  def logged_in?
    !current_user.nil?
  end

  def auth
    redirect_to :root if logged_in?
  end

  def count_unread_notification
    if current_user
      @unread_count = current_user.notifications.where(unread: true).count
    else
      @unread_count = 0
    end
  end

  def track_activity(trackable, course_id, action = params[:action])
    current_user.activities.create! action: action, trackable: trackable, course_id: course_id
  end

  def destroy_notifications(notifiable)
    Notification.where(:notifiable_id => notifiable.id, :notifiable_type => notifiable.class.name).delete_all
  end
end
