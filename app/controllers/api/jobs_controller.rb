# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def index
      jobs = Job.all
      render status: 200, json: { data: jobs.as_json }
    end

    def authenticate
      # Check provided password against correct value
      # If it's correct, generate a token and return it in the header

      cookies[:token] = { value: 'Hello world!', expires: 7.days }

      # hmac_secret = 'my$ecretK3y'
      # token = JWT.encode payload, hmac_secret, 'HS256'
      render status: 200, json: { data: 'Hello world!' }
    end
  end
end
