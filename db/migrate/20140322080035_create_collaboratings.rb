class CreateCollaboratings < ActiveRecord::Migration
  def change
    create_table :collaboratings do |t|
      t.integer :course_id
      t.integer :user_id

      t.timestamps
    end
    add_index :collaboratings, :course_id
    add_index :collaboratings, :user_id
  end
end
