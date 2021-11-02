# frozen_string_literal: true

Rails.application.routes.draw do
  root 'site#home'
  namespace :api do
    resources :events, only: [:none] do
      collection do
        get 'past'
      end
    end
  end
end
