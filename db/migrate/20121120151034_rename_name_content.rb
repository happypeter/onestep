class RenameNameContent < ActiveRecord::Migration
  def up
    rename_column :comments, :name, :content
  end

  def down
  end
end
