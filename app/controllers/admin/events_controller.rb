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
      @admin = current_user
      redirect_to new_user_session_path unless @admin
      @event = Event.find_by(id:params[:id])
      redirect_to '/404' unless @event
    end

  end
end
