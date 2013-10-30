class AddRatioToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :ratio, :float
  end
end
