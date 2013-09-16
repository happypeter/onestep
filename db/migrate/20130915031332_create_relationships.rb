class CreateRelationships < ActiveRecord::Migration
  def change
    create_table :relationships do |t|
      t.integer :follower_id
      t.integer :followed_user_id

      t.timestamps
    end
    add_index :relationships, :follower_id
    add_index :relationships, :followed_user_id
    add_index :relationships, [:follower_id, :followed_user_id], unique: true
  end
end
