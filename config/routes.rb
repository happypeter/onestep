Onestep::Application.routes.draw do
  get "courses/:name/:no" => "courses#show"
  get "create_course" => "courses#new"
  get "courses/:name" => "courses#show"
  get "edit/:course_name" => "courses#edit"
  get "about" => "info#about", :as => "about"
  get "/blog" => "posts#index", :as => "blogs"
  get "/blog/:id" => "posts#show"
  get "/write_blog" => "posts#new"
  put "/upyun_images" => "upyun_images#create" #for file-upload on posts#edit
  resources :posts
  resources :courses
  resources :upyun_images
  resources :videos

  resources :users
  resources :comments
  match "login" => "users#login_form", :as => "login"
  match "submit_login_form" => "users#login"
  match "logout" => "users#logout", :as => "logout"
  match "signup" => "users#signup", :as => "signup"

  root :to => 'info#marketing'
end
