# frozen_string_literal: true
module Admin
  class EventsController < ApplicationController
    before_action :authenticate_user!

    def index
      authorize Event

      # TODO: implement this method
      render status: 200, json: {}
    end

    def edit
      @event = Event.find_by(id:params[:id])
      @admin = current_user
      p @event, @admin
      redirect_to new_user_session_path unless @admin
      redirect_to('/404') unless @event
    end
  end
end
