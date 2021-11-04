# frozen_string_literal: true

module Api
  class EventsController < ApplicationController
    def past
      events = Event.where('date < ?', DateTime.current).order(date: :desc)
      render status: 200, json:  { data: events.as_json }
    end

    def past_by_month
      event_date = DateTime.new(params[:year].to_i, params[:month].to_i)
      events = Event.where(date: event_date..event_date.end_of_month)
      if events.empty?
        render status: 404, json: {data: 'No events found'}
      else
        render status: 200, json: {data: events.as_json}
      end
    end
  end
end
