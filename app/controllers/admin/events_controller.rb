# frozen_string_literal: true
module Admin
  class EventsController < ApplicationController
    before_action :authenticate_user!

    def index
      authorize Event

      @events = Event.includes(:speakers)
                     .order(date: :desc)
    end

    def edit
      authorize Event

      @event = Event.find_by(id: params[:id])
      render_not_found unless @event
    end

    def update
      authorize Event

      @event = Event.find_by(id: params[:id])
      render_not_found unless @event

      if @event.update(required_params)
        redirect_to admin_dashboard_path
      else
        render :edit
      end
    end

    private

    def required_type
      params[:meetup].present? ? params.require(:meetup) : params.require(:panel)
    end

    def required_params
      required_type.permit(
        :title,
        :location,
        :description,
        'date(1i)',
        'date(2i)',
        'date(3i)',
        'date(4i)',
        'date(5i)',
        :type,
        :panel_video_link,
      )
    end
  end
end
