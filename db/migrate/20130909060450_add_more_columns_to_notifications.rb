class AddMoreColumnsToNotifications < ActiveRecord::Migration
  def change
    change_table :notifications do |t|
      t.remove  :comment_id
      t.string  :action
      t.integer :notifiable_id
      t.string  :notifiable_type
      t.integer :executor_id
      t.index   :unread
      t.index   :user_id
    end
  end
end
