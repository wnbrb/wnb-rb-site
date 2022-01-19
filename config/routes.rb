# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             path: 'admin',
             path_names: {
               sign_in: '/',
               sign_up: 'new',
               registration: 'register',
             }
  namespace :admin do
    get 'dashboard', to: 'dashboard#show'
  end
  get '/sponsor-us', to: 'site#sponsor_us'
  get '/meetups', to: 'site#meetups'
  get '/jobs', to: 'site#jobs'
  get '/jobs/authenticate', to: 'site#jobs_authenticate'

  root 'site#home'
  namespace :api do
    resources :events, only: [:none] do
      collection do
        get 'past'
        get '/:year/:month', to: 'events#past_by_month'
      end
    end

    resources :jobs, only: [:index] do
      collection { get 'authenticate' }
    end
  end

  namespace :admin do
    resources :events, only: %i[index edit update]
  end

  mount ActionCable.server => '/cable'
  resources :grid
end
