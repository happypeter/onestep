$(".actions").hide()

$(".comment_body").mouseover(function() {
   $(this).find("ul.actions").show();
 }).mouseout(function() {
   $("ul.actions").hide();
   });
