class AddCourseIdToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :course_id, :integer
  end
end
