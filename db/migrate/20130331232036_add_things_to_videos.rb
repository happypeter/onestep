class AddThingsToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :user_id, :integer
    add_column :videos, :size, :integer
    add_column :videos, :filename, :string
    add_column :videos, :content_type, :string
  end
end
