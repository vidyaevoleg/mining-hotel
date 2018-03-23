Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get '/dashboard', to: 'pages#dashboard'
  get '/home', to: 'pages#home'
  resources :accounts do
    get :invite, on: :member
  end
  resources :places, only: [:show]
  namespace :api, defaults: {format: :json} do
    resources :templates
    resources :machines do
      put :update_template, on: :member
      put :reboot, on: :member
      post :save_template, on: :collection
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
