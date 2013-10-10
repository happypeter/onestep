class Course < ActiveRecord::Base
  attr_accessible :description, :name, :title, :poster, :user_id, :public,
                  :price
  validates_presence_of :title

  has_many :videos, order: :position
  has_many :orders
  has_many :activities, :dependent => :destroy
  has_many :watchings, :dependent => :destroy
  has_many :watchers, :through => :watchings, :source => :user
  belongs_to :user

  mount_uploader :poster, PosterUploader

  scope :pub, where(public: true)

  def open_to_user?(user)
    return true if self.price == 0||self.price.blank?
    return false if user.nil?
    return true if user == self.user
    return true if is_paid_user?(user)
  end

  def is_paid_user?(user)
    return false if user.nil?
    order = Order.where(:course_id => self.id, :user_id => user.id).first
    return true if !order.nil? && order.trade_status == 'TRADE_FINISHED'
    false
  end

  def add_watcher(user)
    return false if user == self.user
    return false if self.watchers.include?(user)
    self.watchers << user
  end

  def delete_watcher(user)
    return false if user == self.user
    self.watchers.delete(user)
  end

end
