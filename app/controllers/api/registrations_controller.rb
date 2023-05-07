# frozen_string_literal: true
module Api
  class RegistrationsController < ApplicationController
    def register_user
      if !params.key?(:gtoken)
        render json: { error: 'Recaptcha is disabled' }, status: :not_implemented
      elsif validate_recaptcha(params[:gtoken])
        registration = LeadRegistrationService.new(registration_params)
        registration.update_google_sheet
        render json: { success: 'Captcha challenge is correctly solved' }, status: :ok
      else
        render json: { error: 'Error validating Recaptcha, Please try again later' }, status: :unprocessable_entity
      end
    end

    private
    def registration_params
      params.require(:registration).permit(:name, :email, :joinSlack, :joinGoogleGroup, :identifyAs, :currentJob, 
:lookingForJob)
    end
  end
end
