Onestep::Application.routes.draw do

  root :to => 'info#marketing'
  get '/api/money'  => 'api#money'

  get 'timeline' => "activities#timeline", as: "timeline"

  post '/checkout' => "orders#checkout"
  get '/orders/done' => "orders#done"
  post '/orders/notify' => "orders#notify"
  get "/orders/new" => "orders#new",  :as => "new_order"
  get "/download" => "videos#download", :as => "download_video"

  get "about" => "about#main", :as => "about"
  get "about/team" => "about#team"
  get "about/jobs" => "about#jobs"
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

  get "notifications" => "notifications#index", :as => "notifications"
  delete "notifications/:id" => "notifications#destroy", :as => "notification"
  delete "notifications" => "notifications#clear", :as => "clear_notifications"

  put '/restore_gravatar' => "users#restore_gravatar"
  put 'edit-avatar' => 'users#update_avatar', :as => :update_avatar
  match "edit-avatar" => "users#edit_avatar", :as => "edit_avatar"
  match 'update_poster' => 'courses#update_poster', :as => :update_poster

  resources :comments
  match "/comment_preview" => "comments#preview", :as => "comment_preview"

  get "login" => "users#login", :as => "login"
  get "signup" => "users#signup", :as => "signup"
  post "create_login_session" => "users#create_login_session"
  delete "logout" => "users#logout", :as => "logout"

  put "/course" => "courses#update"
  get "/course" => "courses#index", :as => "course_index"
  post "/course" => "courses#create"
  get "/create_course" => "courses#new", :as => :create_course

  get "/member" => "users#index", :as => "user_index"
  post "/member" => "users#create"
  put "/crop" => "users#crop", :as => "crop"
  put "/crop_poster" => "courses#crop_poster", :as => "crop_poster"

  get "/:member_name/:course_name/timeline" => "activities#index" , :as => "timeline_course"

  post "/:member_name/:course_name/watch" => "courses#watch"
  post "/:member_name/:course_name/unwatch" => "courses#unwatch"
  get "/:member_name/:course_name/watchers" => "courses#watchers", :as => "course_watchers"

  get "/:member_name/:course_name/collaboration" => "courses#collaboration", :as => "course_collab"

  post "/:member_name/:course_name/add_member" => "courses#add_member", :as => "course_add_member"
  post "/:member_name/:course_name/delete_member" => "courses#delete_member", :as => "course_delete_member"

  resources :courses do
    get :autocomplete_user_name, :on => :collection
  end

  post "/:member_name/follow" => "users#follow"
  post "/:member_name/unfollow" => "users#unfollow"

  get "/account" => "users#edit", :as => "account"
  put "/account" => "users#update"
  get "/:member_name" => "users#show", :as => "member"
  delete "/:member_name/:course_name" => "courses#destroy"
  get "/:member_name/:course_name/edit" => "courses#edit" , :as => "edit_course"
  get "/:member_name/:course_name(/:position)" => "courses#show", :constraints => {:position => /\d+/} # "/:xxx/:xxx" will conflict with many things, so have to put bottom
  get "/:member_name/:course_name/:position/edit" => "courses#edit_video"
  get "/:member_name/:course_name/add_video" => "courses#add_video"
  match "/update_video/:id" => "videos#update"
  post "/sort_videos" => "videos#sort"

end
