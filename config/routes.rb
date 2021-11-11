# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations"}
  as :user do
    get '/' => 'devise/registrations#new'
  end
  namespace :api do
    get 'admins/passwords'
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
