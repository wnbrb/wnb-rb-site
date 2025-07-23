# frozen_string_literal: true
module Api
  class RegistrationsController < ApplicationController
    def register_user
      send_email && return if Rails.env.development?

      if !params.key?(:gtoken)
        render json: { error: 'Recaptcha is disabled' }, status: :not_implemented
      elsif validate_recaptcha(params[:gtoken])
        send_email
      else
        render json: { error: 'Error validating Recaptcha, Please try again later' }, status: :unprocessable_entity
      end
    end

    private

    def send_email
      name = params[:name]
      email = params[:email]
      discord_link = ENV.fetch('DISCORD_INVITE_URL', nil)

      DiscordInvitationMailer.invite(name, email, discord_link).deliver_now

      render json: { success: 'Captcha challenge is correctly solved' }, status: :ok
    end
  end
end
