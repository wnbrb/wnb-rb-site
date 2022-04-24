# frozen_string_literal: true

module Api
  class EventsController < ApplicationController
    def past
      events = Event.where('date < ?', DateTime.current).order(date: :desc)
      events_by_date =
        events
          .group_by { |event| event.date.year }
          .transform_values do |events_by_year|
            events_by_year.group_by { |event| event.date.strftime('%B') } # group by month name
          end

      render status: 200, json: { data: events_by_date.as_json(include: [:event_speakers, :speakers]) }
    end

    def past_by_month
      event_date = DateTime.new(params[:year].to_i, params[:month].to_i)
      event = Event.where(date: event_date..event_date.end_of_month).first
      if event.present?
        render status: 200, json: { data: event.as_json }
      else
        render status: 404, json: { data: 'No events found' }
      end
    end

    def upcoming
      events = Event.where('date > ?', DateTime.current).order(date: :asc)
      events_by_date =
        events
          .group_by { |event| event.date.year }
          .transform_values do |events_by_year|
            events_by_year.group_by { |event| event.date.strftime('%B') }
          end

      if events.present?
        render status: 200, json: { data: events_by_date.as_json(include: :speakers) }
      else
        render status: 404, json: { data: 'No events found' }
      end
    end
  end
end
