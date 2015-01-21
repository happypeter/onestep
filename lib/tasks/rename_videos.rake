# encoding: utf-8

namespace :db do
  desc "rename course videos"
  task :rename_videos => :environment do
    root = File.expand_path(File.dirname(__FILE__))
    videos = File.join(root, 'videos')
    if not Dir.exist?(videos)
      `mkdir #{videos}`
    end
    backup = File.join(root, 'backup')
    if not Dir.exist?(backup)
      `mkdir #{backup}`
    end
    names = {}
    Video.all.each do |v|
      asset_name = v.asset_url.split('/').last
      v_name =  v.filename ? v.id.to_s + '_' + v.filename : v.id.to_s + '.' + asset_name.split('.').last
      course_name = v.course.id.to_s + '_' + v.course.name
      new_v_name = v.course.id.to_s + '_' + v.course.name + '/' + v_name
      names[asset_name] = new_v_name
      course = File.join(backup, course_name)
      if not Dir.exist?(course)
        `mkdir #{course}`
      end
      `cp #{videos + '/' + asset_name} #{course + '/' + v_name}`
    end
  end
end
