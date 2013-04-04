class RemoveUpyunVideos < ActiveRecord::Migration
  def up
    drop_table :upyun_videos
  end

  def down
  end
end
