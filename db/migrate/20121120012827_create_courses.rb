class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.string :cover
      t.string :description

      t.timestamps
    end
  end
end
