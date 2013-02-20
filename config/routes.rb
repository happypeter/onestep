Onestep::Application.routes.draw do
  get "about" => "info#about", :as => "about"
  get "about/team" => "info#team"
  get "about/work" => "info#work"
  get "/blog" => "posts#index", :as => "blogs"
  get "/blog/:id" => "posts#show", :as => "blog"
  get "/write_blog" => "posts#new"
  put "/upyun_images" => "upyun_images#create" #for file-upload on posts#edit
  resources :posts
  resources :upyun_images
  resources :videos

  get "/member/:name" => "users#show", :as => "member"
  put "/member/:name" => "users#update", :as => "member"
  get "/member/:name/edit" => "users#edit", :as => :edit_member 
  get "/members" => "users#index"
  post "/members" => "users#create"
  #resources :users
  resources :comments
  match "login" => "users#login_form", :as => "login"
  match "submit_login_form" => "users#login"
  match "logout" => "users#logout", :as => "logout"
  match "signup" => "users#signup", :as => "signup"
  match "/comment_preview" => "comments#preview", :as => "comment_preview"

  root :to => 'info#marketing'

  get "create_course" => "courses#new"
  get "all"=> "courses#index", :as => "all_courses"
  get "/course" => "courses#index", :as => "courses"
  post "/course" => "courses#create"
  get ":course_name/edit" => "courses#edit"
  get ":course_name(/:video_no)" => "courses#show", :as => "course"
end
