class RenameUpyunImages < ActiveRecord::Migration
  def up
    rename_table :upyun_images, :blog_images
  end

  def down
  end
end
