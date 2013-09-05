class CreateWatchings < ActiveRecord::Migration
  def change
    create_table :watchings do |t|
      t.integer :watcher_id
      t.integer :course_id

      t.timestamps
    end
    add_index :watchings, :watcher_id
    add_index :watchings, :course_id
  end
end
