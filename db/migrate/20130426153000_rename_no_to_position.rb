class RenameNoToPosition < ActiveRecord::Migration
  def up
    rename_column :videos, :no, :position
  end

  def down
  end
end
