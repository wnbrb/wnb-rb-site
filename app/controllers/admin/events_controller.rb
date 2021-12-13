# frozen_string_literal: true
module Admin
  class EventsController < ApplicationController
    before_action :authenticate_user!

    def index
      authorize Event

      # TODO: implement this method
      render status: 200, json: {}
    end
  end
end
