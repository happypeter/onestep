class ChangeUpdateTimeInCourse < ActiveRecord::Migration
  def up
    Course.find_each do |course|
      date = course.videos.order('updated_at desc').last.updated_at
      course.update_attribute(:updated_at, date)
    end
  end

  def down
    Course.find_each do |course|
      date = course.created_at
      course.update_attribute(:updated_at, date)
    end
  end
end
