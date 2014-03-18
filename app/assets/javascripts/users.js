(function(){
  window.Users = {
    follow: function(el) {
      var followed, user;
      user = $(el).data("user");
      followed = $(el).data("followed");
      if (followed) {
        path = "/" + user + "/unfollow";
        $.ajax({
          url: path,
          type: "post"
        });
        $(document).ajaxSuccess(function(event, xhr, settings){
          if (settings.url == path) {
            $(el).data("followed", false);
            $(el).css('background-color','#2589CC');
            $(el).html('<i class="fa fa-plus"></i>'+ I18n["Follow"] );
          }
        });
      } else {
        path = "/" + user + "/follow";
        $.ajax({
          url: path,
          type: "post"
        });
        $(document).ajaxSuccess(function(event, xhr, settings){
          if (settings.url == path) {
            $(el).data("followed", true);
            $(el).css('background-color','#34CF7A');
            $(el).html('<i class="fa fa-check"></i>' + I18n["Following"]);
          }
        });
      }
      return false;
    }
  };
}());
