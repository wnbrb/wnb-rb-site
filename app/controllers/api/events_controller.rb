# frozen_string_literal: true

module Api
  class EventsController < ApplicationController

    def show
      event = Event.find(params[:id])

      if event.present?
        render status: 200, json: { data: event.as_json(include: %i[event_speakers speakers]) }
      else
        render status: 404, json: { data: 'No event found' }
      end
    end

    def past
      events = Event.includes([:speakers]).by_event_date.where('date < ?', DateTime.current)
      events_by_date =
        events
          .group_by { |event| event.date.year }
          .transform_values do |events_by_year|
            events_by_year.group_by { |event| event.date.strftime('%B') } # group by month name
          end

      render status: 200, json: { data: events_by_date.as_json(include: %i[event_speakers speakers]) }
    end

    def by_month
      events_by_month = Event.includes([:speakers]).by_event_date.by_month_year(params[:month].to_i, params[:year].to_i)

      if events_by_month.present?
        render status: 200, json: { data: events_by_month.as_json(include: %i[event_speakers speakers]) }
      else
        render status: 404, json: { data: 'No events found' }
      end
    end

    def upcoming
      events = Event.includes([:speakers]).by_event_date.where('date > ?', DateTime.current)
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
