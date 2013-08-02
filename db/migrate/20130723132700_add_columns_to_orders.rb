class AddColumnsToOrders < ActiveRecord::Migration
  def change
    change_table :orders do |t|
      t.remove :name
      t.string :notify_id
      t.float :total_fee
      t.string :trade_status
      t.string :out_trade_no
      t.datetime :notify_time
    end
  end
end
