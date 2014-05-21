class AddUseGravatarToUsers < ActiveRecord::Migration
  def change
    add_column :users, :use_gravatar, :boolean
  end
end
