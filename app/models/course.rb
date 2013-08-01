class Course < ActiveRecord::Base
  has_many :videos, order: :position
  has_many :orders
  belongs_to :user
  attr_accessible :description, :name, :title, :poster, :user_id, :public,
                  :price
  validates_presence_of :title

  mount_uploader :poster, PosterUploader

  scope :pub, where(public: true)

  def can_watch_video?(user)
    return course_owner?(user) || course_paid?(user)
  end

  def course_paid?(user)
    order = Order.where(:course_id => self.id, :user_id => user.id).first
    paid = false
    # check if user paid this course
    if !order.nil? && order.trade_status == 'TRADE_FINISHED'
      paid = true
    end
    return paid
  end

  def free?
    self.price == 0||self.price.blank?
  end

  def course_owner?(user)
    user.id == self.user_id
  end

end
