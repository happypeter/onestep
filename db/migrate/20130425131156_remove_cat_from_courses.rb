class RemoveCatFromCourses < ActiveRecord::Migration
  def up
    remove_column :courses, :cat
  end

  def down
    add_column :courses, :cat, :string
  end
end
