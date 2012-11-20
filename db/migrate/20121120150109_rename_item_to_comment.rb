class RenameItemToComment < ActiveRecord::Migration
  def up
    rename_table :items, :comments
  end

  def down
  end
end
