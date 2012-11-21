class RenameCoverToCat < ActiveRecord::Migration
  def up
    rename_column :courses, :cover, :cat
  end

  def down
  end
end
