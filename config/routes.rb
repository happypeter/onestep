Onestep::Application.routes.draw do
  root :to => 'info#marketing'

  get "about" => "about#main", :as => "about"
  get "about/team" => "about#team"
  get "about/work" => "about#work"
  get "about/faq" => "about#faq"

  get "/blog" => "posts#index", :as => "blogs"
  get "/blog/:id" => "posts#show", :as => "blog"
  get "/blog/:id/edit" => "posts#edit", :as => "edit_blog"
  get "/write_blog" => "posts#new"
  put "/upyun_images" => "upyun_images#create" #for file-upload on posts#edit
  resources :posts
  resources :upyun_images
  resources :videos
  match 'update_avatar' => 'users#update_avatar', :as => :update_avatar
  match 'update_poster' => 'courses#update_poster', :as => :update_poster

  resources :comments
  match "/comment_preview" => "comments#preview", :as => "comment_preview"

  match "login" => "users#login_form", :as => "login"
  match "submit_login_form" => "users#login"
  match "logout" => "users#logout", :as => "logout"
  match "signup" => "users#signup", :as => "signup"

  put "/course" => "courses#update"
  get "/course" => "courses#index", :as => "courses"
  post "/course" => "courses#create"
  get "/create_course" => "courses#new", :as => :create_course

  get "/member" => "users#index"
  post "/member" => "users#create"

  get "/account" => "users#edit", :as => "account"
  put "/account" => "users#update"
  get "/:member_name" => "users#show", :as => "member"

  get "/:member_name/:course_name/edit" => "courses#edit"
  get "/:member_name/:course_name(/:video_no)" => "courses#show", :constraints => {:video_no => /\d+/} # "/:xxx/:xxx" will conflict with many things, so have to put bottom

end
