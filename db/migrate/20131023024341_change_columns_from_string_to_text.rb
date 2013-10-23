class ChangeColumnsFromStringToText < ActiveRecord::Migration
  def up
    change_column :courses, :description, :text
    change_column :videos, :desc, :text
  end

  def down
  end
end
