class Order < ActiveRecord::Base
  attr_accessible :notify_id, :notify_time, :out_trade_no, :total_fee, :trade_status
  # attr_accessible :user_id, :subject, :course_id

  belongs_to :user
  belongs_to :course

  scope :not_paid, -> { where("trade_status IS NULL") }
  scope :paid, -> { where(trade_status: "TRADE_FINISHED") }
end
