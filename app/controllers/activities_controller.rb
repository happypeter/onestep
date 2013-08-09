class ActivitiesController < ApplicationController
  def index
    @activities = Activity.order("created_at desc")
  end
end
