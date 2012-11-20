Onestep::Application.routes.draw do
  resources :courses

  resources :users
  resources :comments

  match "login" => "users#login_form", :as => "login"
  match "submit_login_form" => "users#login"
  match "logout" => "users#logout", :as => "logout"
  match "signup" => "users#signup", :as => "signup"

  root :to => 'courses#index'
end
