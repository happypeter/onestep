class AddCourseIdToComments < ActiveRecord::Migration
  def change
    add_column :comments, :course_id, :integer
  end
end
