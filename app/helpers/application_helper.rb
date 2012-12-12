module ApplicationHelper
  def poster_link(course)
    if course.has_poster?
      course.poster_url
    else
      "http://media.happycasts.net/hpcasts/screenshots/default.png"
    end
  end
end
