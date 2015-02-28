// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.atwho
//= require jquery_ujs
//= require jquery-ui
//= require autocomplete-rails
//= require comments
//= require courses
//= require users
//= require vendor/jquery_hotkeys
//= require colorbox-rails
//= require vendor/jquery.Jcrop.min
//= require jquery.NobleCount
//= require jquery.tooltipster.min.js
//= require qiniu-video-upload

jQuery(document).ready(function() {
  var commenter_exist = [];
  $('.comment-header-author').each(function() {
    if($.inArray($(this).text(), commenter_exist) < 0) {
      commenter_exist.push($(this).text());
    }
  });
  $('textarea').atwho({ at: "@", 'data': commenter_exist });

  $('.tooltip').tooltipster();
});
