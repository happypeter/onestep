class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :init
  helper_method :current_user, :edit_course_path, :course_path
  def init
    set_locale_to_zh
    count_unread_notification
  end

  def set_locale_to_zh
    I18n.config.enforce_available_locales = false
    I18n.locale = cookies[:locale] || "zh-CN"
  end

  private
  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end

  def edit_course_path(course)
    "/" + course.user.name + "/" + course.name + "/edit"
  end

  def course_path(course)
     "/" + course.user.name + "/" + course.name
  end

  def redirect_to_target_or_default(default, *options)
    redirect_to(session[:return_to] || default, *options)
    session[:return_to] = nil
  end

  def check_admin
    unless current_user && current_user.admin?
      redirect_to :root, :notice => "Only admin can do this."
    end
  end

  def check_login
    redirect_to :login, :notice => t('login_first_plz') if current_user.blank?
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

  def redirect_to_root_if_logged_in
    redirect_to :root if logged_in?
  end

  def count_unread_notification
    @unread_count = current_user ? current_user.notifications.where(:unread => true).count : 0
  end

  def track_activity(trackable, course_id, action = params[:action])
    current_user.activities.create! action: action, trackable: trackable, course_id: course_id
  end

  def destroy_notifications(notifiable)
    id = notifiable.id
    type = notifiable.class.name
    if type == "Video"
      Activity.where(:trackable_id => id, :trackable_type => type).each do |a|
        if a.action != "destroy"
          Notification.where(:notifiable_id => a.id, :notifiable_type => a.class.name).delete_all
        end
      end
    else
      Notification.where(:notifiable_id => id, :notifiable_type => type).delete_all
    end
  end

  def courses_sorted_by_star
    c_watcher = {}
    Course.where(public: true).each{ |c| c_watcher[c] = c.watchers.count }
    c_watcher.sort_by{ |k, v| v }.reverse.map{ |a| a.first }
  end
end
