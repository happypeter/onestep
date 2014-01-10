class RenameVideoIdAndAddCommentableTypeToComments < ActiveRecord::Migration
  def change
    change_table :comments do |t|
      t.rename :video_id, :commentable_id
      t.string :commentable_type
      t.index  [:commentable_id, :commentable_type]
    end
  end
end
