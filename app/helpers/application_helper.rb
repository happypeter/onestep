module ApplicationHelper
  def current_translations
    I18n.backend.send(:init_translations) unless I18n.backend.initialized?
    @translations ||= I18n.backend.send(:translations)
    @translations[I18n.locale].with_indifferent_access
  end

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

  def commentable_comment_path(comment_id)
    commentable = Comment.find(comment_id).commentable
    case commentable.class.name.underscore
    when "video"
      "#{course_path(commentable.course)}/#{commentable.position.to_s}#comment_#{comment_id}"
    when "post"
      "#{blog_path(commentable)}/#comment_#{comment_id}"
    end
  end

  def owner?(item)
    return false if item.blank? || current_user.blank?
    item.user_id == current_user.id
  end

  def paid_course?(course)
    course.price.present? && course.price > 0.0
  end

  def course_name_tag(course_id)
    course = Course.find_by_id(course_id)
    link_to course.title, course_path(course)
  end

  def video_course_path(video)
    if video.title.present?
      link_to video.title, "#{course_path(video.course)}/#{video.position.to_s}"
    else
      link_to t('author_forgot_title'), "#{course_path(video.course)}/#{video.position.to_s}"
    end
  end
end
