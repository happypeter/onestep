$(".preview-tab").click(function() {
  $(".write-tab").removeClass("selected");
  $(this).addClass("selected");

  var b = $(".previewable-comment-form .comment-content");
  var preview_content = b.find("textarea").val();
  b.find("textarea").hide();
  b.prepend("<div class='preview-box markdown-format' id='preview-box'>加载中...</div>");
  $.ajax({type: "POST",url: "/comment_preview",data: {content: preview_content }});

  return false;
});
$(".write-tab").click(function() {
  $(".preview-tab").removeClass("selected");
  $(this).addClass("selected");
  var b = $(".previewable-comment-form .comment-content");
  $(".preview-box").remove();
  b.find('textarea').show();
  return false;
});
