class ChangeCourse < ActiveRecord::Migration
  def up
    rename_column :courses, :poster_url, :poster
  end

  def down
  end
end
