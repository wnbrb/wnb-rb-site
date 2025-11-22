# frozen_string_literal: true
module Admin
  class SpeakersController < AdminController
    include Pagy::Backend

    before_action :authorize_speaker
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
    def edit; end

    def create
    @speaker = Speaker.new(speaker_params.except(:image_file))

    if params[:speaker][:image_file].present?
      file = params[:speaker][:image_file]
      filename = "#{Time.current.strftime('%Y%m%d%H%M%S')}_#{file.original_filename}"

      dropbox_service = DropboxService.new
      dropbox_path = "Speakers/#{filename}"

      # Upload file to Dropbox
      dropbox_service.upload(file, dropbox_path)

      #  Get public URL (with raw=1)
      @speaker.image_url = dropbox_service.public_url(dropbox_path)
    end

    if @speaker.save
      redirect_to admin_speakers_path, notice: 'Speaker created successfully.'
    else
      render :new, status: :unprocessable_content
    end
  end

    # PATCH/PUT /admin/speakers/1
 def update
    if params[:speaker][:image_file].present?
      file = params[:speaker][:image_file]
      filename = "#{Time.current.strftime('%Y%m%d%H%M%S')}_#{file.original_filename}"

      dropbox_service = DropboxService.new
      dropbox_path = "Speakers/#{filename}"

      dropbox_service.upload(file, dropbox_path)
      @speaker.image_url = dropbox_service.public_url(dropbox_path)
    end

    if @speaker.update(speaker_params.except(:image_file))
     redirect_to admin_speakers_path, notice: 'Speaker updated successfully.'
    else
      render :edit, status: :unprocessable_content
    end
  end

    private

    def authorize_speaker
      authorize Speaker
    end
    
    def set_speaker
      @speaker = Speaker.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def speaker_params
      params.require(:speaker).permit(
        :name,
        :bio,
        :tagline,
        :github,
        :linkedin,
        :mastodon,
        :image_file,
        :website,
        :twitter,
        :other,
      )
    end
  end
end