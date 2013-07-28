class CreateAlipayNotifications < ActiveRecord::Migration
  def change
    create_table :alipay_notifications do |t|
      t.string :out_trade_no
      t.datetime :notify_time
      t.float :total_fee

      t.timestamps
    end
  end
end
