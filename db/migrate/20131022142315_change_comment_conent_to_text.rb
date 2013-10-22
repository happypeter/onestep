class ChangeCommentConentToText < ActiveRecord::Migration
  def up
    change_column :comments, :content, :text
  end

  def down
  end
end
