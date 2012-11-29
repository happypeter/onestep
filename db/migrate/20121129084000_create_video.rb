class CreateVideo < ActiveRecord::Migration
  def up
    create_table :videos do |t|
      t.string :title
      t.timestamps
    end
  end

  def down
  end
end
