class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  has_many :posts
  has_many :courses
  has_many :orders
  has_many :notifications

  attr_accessible :name, :email, :avatar, :password, :password_confirmation, :admin

  mount_uploader :avatar, AvatarUploader

  validates_presence_of :name, :email

  before_create { generate_token(:token) }

  def paid_courses
    courses = []
    for order in self.orders
      courses.push order.course
    end
    courses.uniq
  end

  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    UserMailer.password_reset(self).deliver
  end

  def has_avatar?
    self.read_attribute(:avatar).present?
  end
  def gravatar_url
    default_url = Settings.image.default_avatar
    gravatar_id = Digest::MD5.hexdigest(self.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=512&d=#{CGI.escape(default_url)}"
  end
  def final_avatar_url
    if self.has_avatar?
      self.avatar_url
    else
      self.gravatar_url
    end
  end
  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
