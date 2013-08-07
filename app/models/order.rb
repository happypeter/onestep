class Order < ActiveRecord::Base
  attr_accessible :notify_id, :notify_time, :out_trade_no, :total_fee, :trade_status
  attr_accessible :user_id, :subject, :course_id
  belongs_to :user
  belongs_to :course
end
