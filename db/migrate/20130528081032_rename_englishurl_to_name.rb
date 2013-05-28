class RenameEnglishurlToName < ActiveRecord::Migration
  def up
    rename_column :posts, :english_title, :name
  end

  def down
  end
end
