#= require vendor/qiniu_direct_uploader

$(document).ready(function() {
  var createVideoForm;
  createVideoForm = $("form#create-video-uploader");
  if (createVideoForm.length > 0) {
    createVideoForm.QiniuUploader({
      autoUpload: true,
      singleFileUploads: true
    });
  }
});
