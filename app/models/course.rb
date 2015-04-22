class Course < ActiveRecord::Base
  attr_accessible :description, :name, :title, :poster, :user_id, :public,
                  :price
  validates_presence_of :title

  has_many :videos, -> { order :position }, :dependent => :destroy
  has_many :orders
  has_many :activities, :dependent => :destroy
  has_many :watchings, :dependent => :destroy
  has_many :watchers, :through => :watchings, :source => :user
  belongs_to :user

  has_many :collaboratings, :dependent => :destroy
  has_many :collaborators, :through => :collaboratings, :source => :user

  scope :pub, -> { where(public: true) }

  mount_uploader :poster, PosterUploader

  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

  after_update :reprocess_poster, :if => :cropping?

  # this method will be called during standard assignment in your controller
  # (like `update_attributes`)
  def image_data=(data)
    regex = /data:(.*);(.*),/
    realdata = regex.match(data).post_match

    # decode data and create stream on them
    io = CarrierStringIO.new(Base64.decode64(realdata))

    # this will do the thing (poster is mounted carrierwave uploader)
    self.poster = io
  end

  def reprocess_poster
    poster.recreate_versions!
  end

  def cropping?
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def open_to_user?(user)
    return true if self.price == 0||self.price.blank?
    return false if user.nil?
    return true if user == self.user
    return true if is_paid_user?(user)
    return true if collaborator?(user)
  end

  def is_paid_user?(user)
    return false if user.nil?
    order = Order.where(:course_id => self.id, :user_id => user.id, trade_status: "TRADE_FINISHED").first
    return true if order
    false
  end

  def collaborator?(user)
    return true if self.collaborators.include?(user)
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
