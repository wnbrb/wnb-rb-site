# frozen_string_literal: true

module Api
  class ResourcesController < ApplicationController
    protect_from_forgery with: :exception

    def index
      resources = Resource.recent
      resources = resources.by_category(params[:category]) if params[:category].present?
      render json: { data: resources.map(&:as_json) }
    end

    def create
      resource = Resource.new(resource_params)

      if resource.save
        render json: { message: "Resource submitted successfully!" }, status: :created
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def resource_params
      params.permit(:title, :url, :description, :category, :submitted_by)
    end
  end
end
