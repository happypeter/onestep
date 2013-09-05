class ChangeTableWatchings < ActiveRecord::Migration
  def up
    rename_column :watchings, :watcher_id, :user_id
    rename_index :watchings, 'index_watchings_on_watcher_id', 'index_watchings_on_user_id'
  end

  def down
  end
end
