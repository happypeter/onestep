# coding: utf-8
module CoursesHelper
  def course_watch_tag(course)
    return "" if course.blank?
    return "" if current_user.blank?
    return "" if owner?(course)
    class_name = "watch"
    text = t('watch_course')
    if course.watchers.include?(current_user)
      class_name = "watched"
      text = t('unwatch_course')
    end
    link_to text, "#", :onclick => "return Courses.watch(this);",
            class: "minibutton watch_tag",
            'data-user' => course.user.name,
            'data-course' => course.name,
            'data-watched' => (class_name == "watched")
  end
end
