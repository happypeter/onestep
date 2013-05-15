class InfoController < ApplicationController
  def marketing
    @recent_courses = Course.where(public: true).limit(3).order('id desc')
    @user = User.new
    session[:return_to] = request.url
  end

  def set_locale
    cookies.permanent[:locale] = params[:locale]
    redirect_to_target_or_default :root
  end
end

