# frozen_string_literal: true

module Admin
  class ResourcesController < AdminController
    include Pagy::Backend

    before_action :authorize_resource
    before_action :set_resource, only: %w[edit update destroy]

    def index
      @pagy, @resources = pagy(Resource.recent, items: 15)
    end

    def new
      @resource = Resource.new
    end

    def create
      @resource = Resource.new(resource_params)

      if @resource.save
        redirect_to admin_resources_path, notice: "Resource created successfully."
      else
        render :new, status: :unprocessable_content
      end
    end

    def edit; end

    def update
      if @resource.update(resource_params)
        redirect_to admin_resources_path, notice: "Resource updated successfully."
      else
        render :edit, status: :unprocessable_content
      end
    end

    def destroy
      @resource.destroy
      redirect_to admin_resources_path, notice: "Resource deleted."
    end

    private

    def authorize_resource
      authorize Resource
    end

    def set_resource
      @resource = Resource.find(params[:id])
    end

    def resource_params
      params.require(:resource).permit(:title, :url, :description, :category, :submitted_by)
    end
  end
end
