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
  get '/meetups/:id', to: 'site#meetup'

  get '/jobs', to: 'site#jobs'
  get '/jobs/authenticate', to: 'site#jobs_authenticate'
  get '/donate', to: 'site#donate'

  root 'site#home'

  namespace :api do
    resources :events, only: [:show] do
      collection do
        get 'past'
        get '/:year/:month', to: 'events#by_month'
        get 'upcoming'
      end
    end

    resources :jobs, only: [:index] do
      collection { post 'authenticate' }
    end
  end

  namespace :admin do
    resources :events, only: %i[index edit update destroy]
  end

  mount ActionCable.server => '/cable'
  resources :grid
end
