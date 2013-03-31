class RemoveLinkFromVideos < ActiveRecord::Migration
  def up
    remove_column :videos, :link
  end

  def down
  end
end
