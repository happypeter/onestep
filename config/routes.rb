Onestep::Application.routes.draw do

  root :to => 'info#marketing'

  post '/checkout' => "orders#checkout"
  get '/orders/done' => "orders#done"
  post '/orders/notify' => "orders#notify"
  get "/orders/new" => "orders#new",  :as => "new_order"

  get "about" => "about#main", :as => "about"
  get "about/team" => "about#team"
  get "about/work" => "about#work"
  get "about/faq" => "about#faq"
  get "/set_locale" => "info#set_locale"
  get "/styleguide/css(/:ref)" => "info#styleguide"

  get "/blog" => "posts#index", :as => "blogs"
  get "/blog/:id" => "posts#show", :as => "blog"
  get "/blog/:id/edit" => "posts#edit", :as => "edit_blog"
  get "/write_blog" => "posts#new"
  put "/blog_images" => "blog_images#create" #for file-upload on posts#edit
  resources :posts
  resources :blog_images
  resources :videos
  resources :password_resets
  resources :notifications
  match 'update_avatar' => 'users#update_avatar', :as => :update_avatar
  match "edit-avatar" => "users#edit_avatar", :as => "edit_avatar"
  match 'update_poster/:course_id' => 'courses#update_poster', :as => :update_poster

  resources :comments
  match "/comment_preview" => "comments#preview", :as => "comment_preview"

  match "login" => "users#login_form", :as => "login"
  match "submit_login_form" => "users#login"
  match "logout" => "users#logout", :as => "logout"
  match "signup" => "users#signup", :as => "signup"

  put "/course" => "courses#update"
  get "/course" => "courses#index", :as => "course_index"
  post "/course" => "courses#create"
  get "/create_course" => "courses#new", :as => :create_course

  get "/member" => "users#index", :as => "user_index"
  post "/member" => "users#create"
  put "/crop" => "users#crop", :as => "crop"

  get "/:member_name/:course_name/timeline" => "activities#index" , :as => "timeline_course"

  post "/:member_name/:course_name/watch" => "courses#watch"
  post "/:member_name/:course_name/unwatch" => "courses#unwatch"
  get "/:member_name/:course_name/watchers" => "courses#watchers", :as => "course_watchers"

  get "/account" => "users#edit", :as => "account"
  put "/account" => "users#update"
  get "/:member_name" => "users#show", :as => "member"
  delete "/:member_name/:course_name" => "courses#destroy"
  get "/:member_name/:course_name/edit" => "courses#edit" , :as => "edit_course"
  get "/:member_name/:course_name(/:position)" => "courses#show", :constraints => {:position => /\d+/} # "/:xxx/:xxx" will conflict with many things, so have to put bottom
  get "/:member_name/:course_name/:position/edit" => "courses#edit_video"
  match "/update_video/:id" => "videos#update"
  post "/sort_videos" => "videos#sort"

end
