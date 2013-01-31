class InfoController < ApplicationController
  def marketing
    @recent_courses = Course.find(:all, :order => "id desc", :limit => 3)
    @user = User.new
  end

  def about
  end

  def team
  end

  def work
  end

end

