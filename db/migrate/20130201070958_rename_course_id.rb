class RenameCourseId < ActiveRecord::Migration
  def up
    rename_column :comments, :course_id, :video_id
  end

  def down
  end
end
