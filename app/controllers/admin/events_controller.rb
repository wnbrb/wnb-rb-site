# frozen_string_literal: true
module Admin
  class EventsController < AdminController
    include Pagy::Backend

    before_action :authorize_event
    before_action :set_event, only: %w[edit update destroy]

    def index
      @pagy, @events = pagy(Event.includes(:speakers).order(date: :desc), items: 15)
    end

    def new
      @event = Event.new
    end

    def create
      @event = Event.create(event_params)

      if @event.save
        redirect_to edit_admin_event_path(@event), notice: 'Event was successfully created'
      else
        render :new, status: :unprocessable_content
      end
    end

    def edit
      render_not_found unless @event
    end

    def update
      render_not_found unless @event

      if @event.update(event_params)
        redirect_to admin_events_path, notice: 'Event was successfully updated'
      else
        render :edit, status: :unprocessable_content, notice: 'Error updating event'
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

    #GET /admin/events/set_talk/1
    def set_talk
      @talk = Talk.new
      @url = generate_talk_admin_events_path(talk_id: 'create_talk')

      return unless params[:talk_id] != 'new_talk'
      talk_id = params[:talk_id]
      @talk = Talk.new(event_params['talks_attributes'][talk_id].except(:_destroy))
      @url = generate_talk_admin_events_path(talk_id: talk_id)
    end

    #POST /admin/events/get_talk/1
    def generate_talk
      @talk = Talk.new(talk_params)
      talk_id = @talk.object_id

      talk_id = params[:talk_id] if params[:talk_id] != 'create_talk'
      @talk.id = params[:talk_id] if params[:talk_id] != 'create_talk'

      if @talk.valid?
        render 'admin/events/form/_card_talk_new',
               locals: {
                 talk: @talk,
                 talk_id: talk_id,
               },
               formats: %i[turbo_stream html]
      else
        @url = generate_talk_admin_events_path(talk_id: talk_id)
        render :set_talk, status: :bad_request, formats: [:turbo_stream]
      end
    end

    private

    def authorize_event
      authorize Event
    end

    def set_event
      @event = Event.includes(talks: :speaker).find_by(id: params[:id])
    end

    def event_params
      params.require(:event).permit(
        :id,
        :title,
        :location,
        :description,
        :date,
        :type,
        :panel_video_link,
        talks_attributes: Talk.attribute_names.map(&:to_sym).push(:_destroy),
      )
    end

    def talk_params
      params.require(:talk).permit(
        :talk_description,
        :talk_title,
        :talk_video_link,
        :speaker_id,
        :event_id,
        :_destroy,
      )
    end
  end
end
