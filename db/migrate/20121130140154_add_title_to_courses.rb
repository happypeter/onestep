class AddTitleToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :title, :string
  end
end
