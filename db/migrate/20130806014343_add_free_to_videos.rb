class AddFreeToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :free, :boolean
  end
end
