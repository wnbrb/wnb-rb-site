# frozen_string_literal: true

module Api
  class EventsController < ApplicationController
    def past
      events = Event.where('date < ?', DateTime.current).order(date: :desc)
      render status: 200, json:  { data: events.as_json }
    end
  end
end
