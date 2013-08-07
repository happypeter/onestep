class AddCourseIdToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :course_id, :integer
  end
end
