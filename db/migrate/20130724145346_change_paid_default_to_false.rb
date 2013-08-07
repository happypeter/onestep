class ChangePaidDefaultToFalse < ActiveRecord::Migration
  def up
    change_column :orders, :paid, :boolean, :default => false
  end

  def down
  end
end
