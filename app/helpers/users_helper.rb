# encoding: utf-8
module UsersHelper
  def follow_user_tag(user)
    class_name = "follow"
    text = "<i class='fa fa-plus'></i> " + t('Follow')
    if current_user.blank?
      return link_to sanitize(text), login_url, :class => "follow-user-button"
    end
    if current_user.following?(user)
      class_name = "followed"
      text = "<i class='fa fa-check'></i> " + t('Following')
    end
    link_to sanitize(text), "#", :onclick => "return Users.follow(this);",
            :class => "follow-user-button",
            'data-user' => user.name,
            'data-followed' => (class_name == "followed")
  end
end
