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

end
