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
      # render :file => "#{Rails.root}/public/404.html",  :status => 404
    end

    def update
      @admin = current_user
      redirect_to new_user_session_path unless @admin
      @event = Event.find_by(id:params[:id])
      redirect_to '/404' unless @event

      if @event.update(required_params)
        redirect_to admin_dashboard_path
      else
        render 'edit'
      end
    end

    private

    def required_params
      if params[:meetup].present?
        meetup_params
      elsif params[:panel].present?
        panel_params
      else
        event_params
      end
    end

    def meetup_params
      params.require(:meetup).permit(:title, :location, :description, :datetime, :type, :panel_video_link)
    end
    def panel_params
      params.require(:panel).permit(:title, :location, :description, :datetime, :type, :panel_video_link)
    end
    def event_params
      params.require(:event).permit(:title, :location, :description, :datetime, :type, :panel_video_link)
    end

  end
end
