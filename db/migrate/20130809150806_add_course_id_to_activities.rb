class AddCourseIdToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :course_id, :integer
    add_index :activities, :course_id
  end
end
