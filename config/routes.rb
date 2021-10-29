# frozen_string_literal: true

Rails.application.routes.draw do
  root 'site#home'

  namespace :api do
    namespace :events do
      resources :past, only: [:past_get]
    end
  end
end
