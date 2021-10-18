# frozen_string_literal: true

Rails.application.routes.draw do
  get '/sponsor-us', to: 'site#sponsor_us'

  root 'site#home'
end
