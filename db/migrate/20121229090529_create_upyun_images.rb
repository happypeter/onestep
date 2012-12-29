class CreateUpyunImages < ActiveRecord::Migration
  def change
    create_table :upyun_images do |t|
      t.integer :user_id
      t.string :asset
      t.integer :size
      t.string :content_type
      t.string :filename

      t.timestamps
    end
  end
end
