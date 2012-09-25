class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user
    @current_user ||= User.find_by_token(cookies[:token]) if cookies[:token]
  end
  helper_method :current_user # need this to access from the view

end
