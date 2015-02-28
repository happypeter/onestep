# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

#= require jquery-fileupload/basic
#= require jquery-fileupload/vendor/tmpl

$ = jQuery

$.fn.QiniuUploader = (options) ->

  # support multiple elements
  if @length > 1
    @each ->
      $(this).QiniuUploader options

    return this

  $uploadForm = this

  settings =
    customCallbackData: undefined
    onFilesAdd: undefined
    removeProgressBarWhenCompleted: true
    removeProgressBarWhenFailed: false
    progressBarId: undefined
    buttonId: undefined
    dropPasteZoneId: undefined
    allowMultipleFiles: true

  $.extend settings, options

  submitButtonId = $uploadForm.data('submit-button-id')
  progressBarId  = $uploadForm.data('progress-bar-id')
  dropPasteZoneId= $uploadForm.data('drop-paste-zone-id')

  submitButton   = $('#' + submitButtonId) if submitButtonId
  progressBar    = $('#' + progressBarId) if progressBarId
  dropPasteZone  = if dropPasteZoneId then $('#' + dropPasteZoneId) else $(document)

  currentFiles   = []
  formsForSubmit = []

  if submitButton and submitButton.length > 0
    submitButton.click ->
      form.submit() for form in formsForSubmit
      false

  setUploadForm = ->
    inner_settings =
      dropZone: dropPasteZone
      pasteZone: dropPasteZone
      add: (e, data) ->
        file = data.files[0]

        unless settings.onFilesAdd and not settings.onFilesAdd(file)
          currentFiles.push data
          if $('#template-upload').length > 0
            data.context = $($.trim(tmpl("template-upload", file)))
            $(data.context).appendTo(progressBar || $uploadForm)
          else if !settings.allowMultipleFiles
            data.context = progressBar
          if submitButton and submitButton.length > 0
            if settings.allowMultipleFiles
              formsForSubmit.push data
            else
              formsForSubmit = [data]
          else
            data.submit()

      start: (e) ->
        $uploadForm.trigger("qiniu_upload_start", [e])

      progress: (e, data) ->
        if data.context
          progress = parseInt(data.loaded / data.total * 100, 10)
          data.context.find('.bar').css('width', progress + '%')

      done: (e, data) ->
        postData = buildCallbackData $uploadForm, data.files[0], data.result
        callbackUrl = $uploadForm.data('callback-url')
        if callbackUrl
          $.ajax
            type: $uploadForm.data('callback-method')
            url: callbackUrl
            data: postData
            beforeSend: ( xhr, settings )       -> $uploadForm.trigger( 'ajax:beforeSend', [xhr, settings] )
            complete:   ( xhr, status )         -> $uploadForm.trigger( 'ajax:complete', [xhr, status] )
            success:    ( data, status, xhr )   -> $uploadForm.trigger( 'ajax:success', [data, status, xhr] )
            error:      ( xhr, status, error )  -> $uploadForm.trigger( 'ajax:error', [xhr, status, error] )

        data.context.remove() if data.context && settings.removeProgressBarWhenCompleted # remove progress bar
        $uploadForm.trigger("qiniu_upload_complete", [postData])

        currentFiles.splice($.inArray(data, currentFiles), 1) # remove that element from the array
        $uploadForm.trigger("qiniu_upload_complete", [postData]) unless currentFiles.length

      fail: (e, data) ->
        content = buildCallbackData $uploadForm, data.files[0], data.result
        content.errorThrown = data.errorThrown

        data.context.remove() if data.context && settings.removeProgressBarWhenFailed # remove progress bar
        $uploadForm.trigger("qiniu_upload_failed", [postData])

      formData: (form) ->
        data = form.serializeArray()

        key = $uploadForm.data("key")

        # substitute upload timestamp and uniqueId into key
        keyField = $.grep data, (n) ->
          n if n.name == "key"

        if keyField.length > 0
          keyField[0].value = key

        # IE <= 9 doesn't have XHR2 hence it can't use formData
        # replace 'key' field to submit form
        unless 'FormData' of window
          $uploadForm.find("input[name='key']").val(key)
        data

    $uploadForm.fileupload $.extend true, {}, settings, inner_settings

  buildCallbackData = ($uploadForm, file, result) ->
    content = {}
    content = $.extend content, result if result
    content = $.extend content, settings.customCallbackData if settings.customCallbackData
    content

  #public methods
  @initialize = ->
    # Save key for IE9 Fix
    $uploadForm.data("key", $uploadForm.find("input[name='key']").val())
    setUploadForm()
    this

  @customCallbackData = (newData) ->
    settings.customCallbackData = newData

  @initialize()
