class CreateUpyunVideos < ActiveRecord::Migration
  def up
    create_table :upyun_videos do |t|
      t.integer :user_id
      t.string :asset
      t.integer :size
      t.string :content_type
      t.string :filename

      t.timestamps
    end
  end

  def down
  end
end
