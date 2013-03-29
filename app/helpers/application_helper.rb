module ApplicationHelper
  def poster_link(course)
    if course.has_poster?
      course.poster_url
    else
      "http://media.haoqicat.com/course_poster/default.png"
    end
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
  def course_path(course)
     "/" + course.user.name + "/" + course.name
  end

  def avatar_url(user)
    default_url = Settings.image.default_avatar
    gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=512&d=#{CGI.escape(default_url)}"
  end
end
