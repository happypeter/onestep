#= require vendor/qiniu_direct_uploader

$(document).ready(function() {
  var createVideoForm;
  createVideoForm = $("form#create-video-uploader");
  if (createVideoForm.length > 0) {
    createVideoForm.QiniuUploader({
      autoUpload: true,
      singleFileUploads: true,
      onFilesAdd: function(file) {
        types = /(\.|\/)(mov|mp4)$/i;
        if (types.test(file.type) || types.test(file.name)) {
          return true;
        } else {
          alert("上传失败：" + file.name + " 视频格式错误，请上传mov或mp4文件");
          return false;
        }
      }
    });
  }
});
