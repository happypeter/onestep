class DropPeters < ActiveRecord::Migration
  def up
    drop_table :peters
  end

  def down
  end
end
