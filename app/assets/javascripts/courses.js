(function(){
  window.Courses = {
    watch: function(el) {
      var watched, course_user, course_name;
      var watchers = $(".course-watchers").text();
      course_user = $(el).data("user");
      course_name = $(el).data("course");
      watched = $(el).data("watched");
      if (watched) {
        $.ajax({
          url: "/" + course_user + "/" + course_name + "/unwatch",
          type: "POST"
        });
        $(el).data("watched", false);
        $(el).html("关注课程");
        $(".course-watchers").html(+watchers - 1);
      } else {
        $.ajax({
          url: "/" + course_user + "/" + course_name + "/watch",
          type: "POST"
        });
        $(el).data("watched", true);
        $(el).html("取消关注");
        $(".course-watchers").html(+watchers + 1);
      }
      return false;
    }
  }
}());
