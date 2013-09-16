# encoding: utf-8
module CoursesHelper
  def course_watch_tag(course)
    return "" if course.blank?
    return "" if owner?(course)
    class_name = "watch"
    text = t('watch_course')
    if current_user.blank?
      title = "您必须登录后才能关注课程"
      return link_to text, login_url, :class => "minibutton with-count", :title => title, :rel => "twipsy"
    end
    if course.watchers.include?(current_user)
      class_name = "watched"
      text = t('unwatch_course')
    end
    link_to text, "#", :onclick => "return Courses.watch(this);",
            :class => "minibutton with-count",
            'data-user' => course.user.name,
            'data-course' => course.name,
            'data-watched' => (class_name == "watched")
  end
end
