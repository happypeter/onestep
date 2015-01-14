# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140521052220) do

  create_table "activities", force: true do |t|
    t.string   "action"
    t.integer  "user_id"
    t.integer  "trackable_id"
    t.string   "trackable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "course_id"
  end

  add_index "activities", ["course_id"], name: "index_activities_on_course_id", using: :btree
  add_index "activities", ["user_id"], name: "index_activities_on_user_id", using: :btree

  create_table "blog_images", force: true do |t|
    t.integer  "user_id"
    t.string   "asset"
    t.integer  "size"
    t.string   "content_type"
    t.string   "filename"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "collaboratings", force: true do |t|
    t.integer  "course_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "collaboratings", ["course_id"], name: "index_collaboratings_on_course_id", using: :btree
  add_index "collaboratings", ["user_id"], name: "index_collaboratings_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.integer  "commentable_id"
    t.string   "commentable_type"
  end

  add_index "comments", ["commentable_id", "commentable_type"], name: "index_comments_on_commentable_id_and_commentable_type", using: :btree

  create_table "courses", force: true do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "poster"
    t.integer  "user_id"
    t.boolean  "public"
    t.float    "price"
  end

  create_table "notifications", force: true do |t|
    t.integer  "user_id"
    t.boolean  "unread",          default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "action"
    t.integer  "notifiable_id"
    t.string   "notifiable_type"
    t.integer  "executor_id"
  end

  add_index "notifications", ["notifiable_id", "notifiable_type"], name: "index_notifications_on_notifiable_id_and_notifiable_type", using: :btree
  add_index "notifications", ["unread"], name: "index_notifications_on_unread", using: :btree
  add_index "notifications", ["user_id"], name: "index_notifications_on_user_id", using: :btree

  create_table "orders", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "notify_id"
    t.float    "total_fee"
    t.string   "trade_status"
    t.string   "out_trade_no"
    t.datetime "notify_time"
    t.string   "subject"
    t.integer  "user_id"
    t.integer  "course_id"
  end

  create_table "posts", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "name"
  end

  create_table "relationships", force: true do |t|
    t.integer  "follower_id"
    t.integer  "followed_user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "relationships", ["followed_user_id"], name: "index_relationships_on_followed_user_id", using: :btree
  add_index "relationships", ["follower_id", "followed_user_id"], name: "index_relationships_on_follower_id_and_followed_user_id", unique: true, using: :btree
  add_index "relationships", ["follower_id"], name: "index_relationships_on_follower_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "token"
    t.boolean  "admin"
    t.string   "name"
    t.string   "avatar"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.boolean  "use_gravatar"
  end

  create_table "videos", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "course_id"
    t.integer  "position"
    t.text     "desc"
    t.integer  "user_id"
    t.integer  "size"
    t.string   "filename"
    t.string   "content_type"
    t.string   "asset"
    t.boolean  "free"
    t.float    "ratio"
  end

  create_table "watchings", force: true do |t|
    t.integer  "user_id"
    t.integer  "course_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "watchings", ["course_id"], name: "index_watchings_on_course_id", using: :btree
  add_index "watchings", ["user_id"], name: "index_watchings_on_user_id", using: :btree

end
