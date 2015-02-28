#= require vendor/qiniu_direct_uploader

$(document).ready(function() {
  var videoForm;
  videoForm = $("form#video-uploader");
  if (videoForm.length > 0) {
    videoForm.QiniuUploader({
      autoUpload: true,
      singleFileUploads: true
    });
  }
});
