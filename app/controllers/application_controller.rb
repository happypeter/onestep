class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :set_locale

  def set_locale
    I18n.locale = params[:locale] || "zh-CN" # default to chinese, need http://casts.sme.com/?locale=en to switch to English
  end

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end
  helper_method :current_user # need this to access from the view

  def course_path(course)
     "/" + course.user.name + "/" + course.name
  end
  helper_method :course_path

  def redirect_to_target_or_default(default, *options)
    redirect_to(session[:return_to] || default, *options)
    session[:return_to] = nil
  end

end
