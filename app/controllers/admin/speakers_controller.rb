# frozen_string_literal: true
module Admin
  class SpeakersController < AdminController
    include Pagy::Backend

    before_action :authorize_event
    before_action :set_speaker, only: %w[show edit update]

    # GET /admin/speakers
    def index
      @pagy, @speakers = pagy(Speaker.all, items: 15)
    end

    # GET /admin/speakers/1
    def show; end

    # GET /admin/speakers/new
    def new
      @speaker = Speaker.new
    end

    # GET /admin/speakers/1/edit
    def edit
      render_not_found unless @speaker
    end

    # POST /admin/speakers
    def create
      @speaker = Speaker.new(speaker_params)

      respond_to do |format|
        if @speaker.save
          format.html do
            redirect_to edit_admin_speaker_url(@speaker),
                        notice: 'Speaker was successfully created.'
          end
        else
          format.html { render :new, status: :unprocessable_content }
        end
      end
    end

    # PATCH/PUT /admin/speakers/1
    def update
      respond_to do |format|
        if @speaker.update(speaker_params)
          format.html do
            redirect_to edit_admin_speaker_url(@speaker),
                        notice: 'Speaker was successfully updated.'
          end
          format.json { render :show, status: :ok, location: @speaker }
        else
          format.html { render :edit, status: :unprocessable_content }
          format.json { render json: @speaker.errors, status: :unprocessable_content }
        end
      end
    end

    # DELETE /admin/speakers/1
    # def destroy
    #   @speaker.destroy

    #   respond_to do |format|
    #     format.html do
    #       redirect_to admin_speakers_url, notice: 'Speaker was successfully destroyed.'
    #     end
    #   end
    # end

    private

    def authorize_event
      authorize Event
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_speaker
      @speaker = Speaker.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def speaker_params
      params.require(:speaker).permit(
        :name,
        :bio,
        :tagline,
        :image_url,
        :github,
        :linkedin,
        :mastodon,
        :website,
        :twitter,
        :other,
      )
    end
  end
end
