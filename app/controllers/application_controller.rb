class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale_to_zh

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

  rescue_from ActiveRecord::RecordNotFound do |exception|
    case request.format.to_sym
    when :html
      redirect_to "/404"
    when :js
      redirect_to "/404"
    end
  end
end
