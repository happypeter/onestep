class RemoveAlipayNotifications < ActiveRecord::Migration
  def up
    drop_table :alipay_notifications
  end

  def down
  end
end
