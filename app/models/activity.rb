class Activity < ActiveRecord::Base
  belongs_to :user
  belongs_to :course
  belongs_to :trackable, polymorphic: true
  attr_accessible :action, :trackable, :course_id
end
