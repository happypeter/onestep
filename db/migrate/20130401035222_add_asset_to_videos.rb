class AddAssetToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :asset, :string
  end
end
