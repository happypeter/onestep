class CreatePeters < ActiveRecord::Migration
  def change
    create_table :peters do |t|
      t.string :name
      t.text :body

      t.timestamps
    end
  end
end
