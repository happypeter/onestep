class AddPaidToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :paid, :boolean
  end
end
