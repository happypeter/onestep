class RemovePaidFromOrders < ActiveRecord::Migration
  def up
    remove_column :orders, :paid
  end

  def down
    add_column :orders, :paid, :boolean
  end
end
