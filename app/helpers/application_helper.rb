module ApplicationHelper
  def markdown(text)
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true, filter_html: true)
    options = {
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true
    }
    Redcarpet::Markdown.new(renderer, options).render(text).html_safe
  end

  # For displaying a block documented with KSS.
  #
  # section - The name of the section to render.
  #
  # Returns nothing. Renders a string of HTML to the template.
  def kss_block(section, &block)
    @section = @styleguide.section(section)
    modifiers = @section.modifiers

    @example_html = capture(&block)
    concat render(:partial => "info/styleguide/css/styleguide_block", :locals => {
      :html => @example_html,
      :modifiers => modifiers})
  end

  def show_code(string)
    markdown  "```\n#{string}```\n"
  end

  def video_comment_path(comment_id)
    comment = Comment.find(comment_id)
    course_path(comment.video.course) + '/' + comment.video.position.to_s  + "#comment_#{comment_id}"
  end

  def owner?(item)
    return false if item.blank? or current_user.blank?
    item.user_id == current_user.id
  end

  def course_name_tag(course_id)
    course = Course.find_by_id(course_id)
    link_to course.name, course_path(course)
  end

  def video_course_path(video)
    if video.title.present?
      link_to video.title, course_path(video.course) + "/" + video.position.to_s
    else
      link_to t('author_forgot_title'), course_path(video.course) + "/" + video.position.to_s
    end
  end
end
