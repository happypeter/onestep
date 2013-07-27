class AddSubjectToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :subject, :string
  end
end
