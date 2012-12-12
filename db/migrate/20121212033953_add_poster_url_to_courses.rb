class AddPosterUrlToCourses < ActiveRecord::Migration
  def change
    add_column :courses, :poster_url, :string
  end
end
