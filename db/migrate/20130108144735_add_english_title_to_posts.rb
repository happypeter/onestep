class AddEnglishTitleToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :english_title, :string
  end
end
