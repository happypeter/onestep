(function(){
  window.Users = {
    follow: function(el) {
      var followed, user;
      user = $(el).data("user");
      followed = $(el).data("followed");
      if (followed) {
        path = "/" + user + "/unfollow",
        $.ajax({
          url: path,
          type: "post"
        });
        $(document).ajaxSuccess(function(event, xhr, settings){
          if (settings.url == path) {
            $(el).data("followed", false);
            $(el).html("follow");
          }
        });
      } else {
        path = "/" + user + "/follow",
        $.ajax({
          url: path,
          type: "post"
        })
        $(document).ajaxSuccess(function(event, xhr, settings){
          if (settings.url == path) {
            $(el).data("followed", true);
            $(el).html("unfollow");
          }
        });
      }
      return false;
    }
  }
}());
