# encoding: utf-8

namespace :db do
  desc "fill in the cloumn ratio of table videos"
  task :video_ratio => :environment do
    Video.all.each do |v|
      if v.ratio == nil
        path = File.join(Rails.root, "public", v.asset_url)
        out = `ffmpeg -i #{path} 2>&1`
        if out =~ /([\d]+x[\d]+)/
          a = $1.split('x')
          v.ratio = a[0].to_f / a[1].to_f
        end
      end
      v.save!
    end
  end
end
