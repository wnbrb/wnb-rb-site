# frozen_string_literal: true

module Api
  class JobsController < ApplicationController
    def index
      jobs = Job.all
      render status: 200, json: { data: jobs.as_json }
    end
  end
end
