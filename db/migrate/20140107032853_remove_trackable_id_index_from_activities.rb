class RemoveTrackableIdIndexFromActivities < ActiveRecord::Migration
  def up
    remove_index :activities, :column => :trackable_id
  end

  def down
    add_index :activities, :trackable_id
  end
end
