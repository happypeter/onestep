# coding: utf-8
module UploadHelper
  def qiniu_video_uploader_form(options = {}, &block)
    uploader = QiniuUploader.new(options)
    form_tag(uploader.action, uploader.form_options) do
      all_hidden_fields = {}
      all_hidden_fields =  all_hidden_fields.merge uploader.fields

      custom_hidden_fields = {}
      uploader.custom_fields.each do |key,value|
        custom_hidden_fields["x:#{key}"] = value
      end

      all_hidden_fields =  all_hidden_fields.reverse_merge custom_hidden_fields

      all_hidden_fields.map do |name, value|
        hidden_field_tag(name, value)
      end.join.html_safe + capture(&block)
    end
  end

  class QiniuUploader
    def initialize(options)
      @options = options.reverse_merge(
        expires_in:         36000,
        ssl:                false,
        custom_fields:      {},
        submit_button_id:   nil,
        progress_bar_id:    nil,
        drop_paste_zone_id: nil,
        callback_method:    nil
      )
    end

    def form_options
      {
        id:                 @options[:id],
        class:              @options[:class],
        method:             "post",
        authenticity_token: false,
        multipart:          true,
        data: {
          callback_url:     @options[:callback_url],
          callback_method:  @options[:callback_method],
          submit_button_id: @options[:submit_button_id],
          drop_paste_zone_id: @options[:drop_paste_zone_id],
          progress_bar_id:  @options[:progress_bar_id]
        }.reverse_merge(@options[:data] || {})
      }
    end

    def fields
      the_fields = {}
      the_fields[:token] = @options[:token] || token
      the_fields[:key] = @options[:key] if @options[:key]
      the_fields
    end

    def custom_fields
      @options[:custom_fields]
    end

    def save_key
      return @options[:save_key] if @options[:save_key]
      "$(etag)"
    end

    def action
      @options[:action] || "http#{@options[:ssl] ? 's' : ''}://up.qiniu.com/"
    end

    def return_body
      fields_array = []
      fields_array.push '"etag": $(etag)'
      fields_array.push '"fname": $(fname)'
      fields_array.push '"fsize": $(fsize)'
      fields_array.push '"mimeType": $(mimeType)'
      fields_array.push '"exif": $(exif)'
      fields_array.push '"endUser": $(endUser)'
      fields_array.push '"key": $(key)'
      fields_array.push '"avinfo": $(avinfo.video)'

      custom_fields_array = []
      @options[:custom_fields].each do |k,v|
        custom_fields_array.push '"' + k.to_s + '": $(x:'+ k.to_s + ')'
      end
      custom_fields_json = '"custom_fields": {' + custom_fields_array.join(',') + '}'

      fields_array.push custom_fields_json

      '{'+ fields_array.join(',') +'}'
    end

    def token
      put_policy = Qiniu::Auth::PutPolicy.new( @options[:bucket], @options[:key], @options[:expires_in], nil )
      put_policy.return_body = return_body
      put_policy.save_key = save_key
      put_policy.end_user = @options[:customer] if @options[:customer]

      Qiniu::Auth.generate_uptoken(put_policy)
    end
  end
end

