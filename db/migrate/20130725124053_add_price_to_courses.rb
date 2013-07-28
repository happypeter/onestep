class AddPriceToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :price, :float
  end
end
