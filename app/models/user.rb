class User < ActiveRecord::Base
  has_secure_password
  has_many :comments
  has_many :posts
  has_many :courses

  attr_accessible :name, :email, :password, :password_confirmation, :admin

  validates_uniqueness_of :email
  validates_presence_of :name

  before_create { generate_token(:token) }

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
