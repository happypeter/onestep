# encoding: utf-8

namespace :db do
  desc "delete notifications with empty notifiable object"
  task :notification => :environment do
    a = []
    Notification.all.each do |v|
      if v.notifiable.blank?
        a << v.id

        puts "Type y/n to show the notification"
        option = STDIN.gets.chomp
        puts "#{v.id}: #{v.notifiable_type}" if option == "y"

        puts "Type y/n to delete the notification"
        flag = STDIN.gets.chomp
        v.delete if flag == "y"
      elsif v.notifiable_type == "Activity" && v.action != "destroy"
        if v.notifiable.trackable.blank?
          a << v.id
          puts "Type y/n to show the notification"
          option = STDIN.gets.chomp
          puts "#{v.id}: #{v.notifiable_type}" if option == "y"

          puts "Type y/n to delete the notification"
          flag = STDIN.gets.chomp
          v.delete if flag == "y"
        end
      end
    end
    puts "notifications with empty notifiable object: #{a}"
  end
end
