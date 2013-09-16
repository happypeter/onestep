(function(){
  window.Users = {
    follow: function(el) {
      var followed, user;
      user = $(el).data("user");
      followed = $(el).data("followed");
      if (followed) {
        $.ajax({
          url: "/" + user + "/unfollow",
          type: "post"
        });
        $(el).data("followed", false);
        $(el).html("follow");
      } else {
        $.ajax({
          url: "/" + user + "/follow",
          type: "post"
        })
        $(el).data("followed", true);
        $(el).html("unfollow");
      }
      return false;
    }
  }
}());
