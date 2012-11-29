class AddNoToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :no, :integer
  end
end
