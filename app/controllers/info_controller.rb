class InfoController < ApplicationController
  def marketing
    @recent_courses = Course.where(public: true).limit(3).order('id desc')
    @user = User.new
  end

end

