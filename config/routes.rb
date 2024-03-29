Rails.application.routes.draw do
  devise_for :users
  root 'pages#landing'
  get '/dashboard', to: 'pages#dashboard'
  get '/home', to: 'pages#home'
  get 'pages/stats', to: 'pages#stats'
  resources :accounts do
    get :invite, on: :member
  end
  resources :places, only: [:show]
  namespace :api, defaults: {format: :json} do
    resources :templates do
      get :current, on: :collection
    end
    resources :machines do
      get :stats, on: :member
      put :update_template, on: :member
      put :reboot, on: :member
      post :save_template, on: :collection
    end
  end
end
