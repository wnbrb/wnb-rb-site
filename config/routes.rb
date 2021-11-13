# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'admin', path_names: { sign_in: '/', sign_up: 'new', registration: 'register' }
  namespace :admin do
    get 'dashboard', to: 'dashboard#show'
  end

  root 'site#home'
  namespace :api do
    resources :events, only: [:none] do
      collection do
        get 'past'
      end
    end
  end
  mount ActionCable.server => "/cable"
  resources :grid
end
