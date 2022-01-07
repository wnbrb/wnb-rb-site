# frozen_string_literal: true
module Admin
  class EventsController < ApplicationController
    before_action :authenticate_user!

    def index
      authorize Event

      @events = Event.includes(:speakers)
                     .order(date: :desc)
    end
  end
end
