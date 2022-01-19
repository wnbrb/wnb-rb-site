# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def index
      jobs = Job.all
      render status: 200, json: { data: jobs.as_json }
    end

    def authenticate
      if params[:password] == ENV['JOB_BOARD_PASSWORD']
        token = JWT.encode({ expires: Time.now + 7.days }, ENV['JWT_HMAC_SECRET'], 'HS256')

        cookies[:token] = { value: token, expires: 7.days }
        render status: 201, json: {}
      else
        render status: 401, json: {}
      end
    end
  end
end
