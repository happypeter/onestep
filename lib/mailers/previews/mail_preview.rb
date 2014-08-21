class MailPreview < ActionMailer::Preview
  def welcome
    UserMailer.welcome(User.first)
  end
end
