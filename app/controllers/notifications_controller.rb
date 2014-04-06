class NotificationsController < ApplicationController
  after_filter :mark_read, :only => :index

  def index
    @notifications = current_user.notifications.recent.page(params[:page]).per(30)
  end
  def destroy
    @notification = current_user.notifications.find(params[:id])
    @notification.destroy
    respond_to do |format|
      format.html { redirect_to notifications_path }
    end
  end
  def clear
    current_user.notifications.delete_all
    respond_to do |format|
      format.html { redirect_to notifications_path }
    end
  end
  def mark_read
    current_user.notifications.update_all(unread: false)
  end
end
