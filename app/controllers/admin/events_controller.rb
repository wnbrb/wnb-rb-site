# frozen_string_literal: true
module Admin
  class EventsController < AdminController
    before_action :authorize_event
    before_action :set_event, only: %w[edit update destroy]

    def index
      @events = Event.includes(:speakers)
                     .order(date: :desc)
    end

    def new
      @event = Event.new
    end

    def create
      @event = Event.create(event_params)

      if @event.save
        redirect_to admin_events_path, notice: 'Event has been created successfully'
      else
        render :new, alert: 'Please review'
      end
    end

    def edit
      render_not_found unless @event
    end

    def update
      render_not_found unless @event

      if @event.update(event_params)
        redirect_to admin_events_path
      else
        render :edit
      end
    end

    def destroy
      if @event
        @event.destroy
        redirect_to admin_events_path
        flash[:success] = 'Event successfully deleted'
      else
        render_not_found
      end
    end

    private

    def authorize_event
      authorize Event
    end

    def set_event
      @event = Event.find_by(id: params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :location, :description, :date, :type, :panel_video_link)
    end
  end
end
