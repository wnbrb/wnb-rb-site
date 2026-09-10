# frozen_string_literal: true
module Api
  class RegistrationsController < ApplicationController
    GENERIC_DELIVERY_ERROR = "We couldn't send your invitation email just now. " \
                             'Please try again in a few minutes, or reach out to exec@wnb-rb.dev.'

    def register_user
      if name.blank? || email.blank?
        return render_error('Please tell us your name and email address.', :unprocessable_content)
      end

      unless email.match?(URI::MailTo::EMAIL_REGEXP)
        return render_error('Please enter a valid email address.', :unprocessable_content)
      end

      return send_invitation if skip_recaptcha?

      if !params.key?(:gtoken)
        render_error('Recaptcha is disabled', :not_implemented)
      elsif validate_recaptcha(params[:gtoken])
        send_invitation
      else
        render_error("We couldn't verify that you're a human. Please reload the page and try again.",
                     :unprocessable_content)
      end
    end

    private

    def name
      params[:name].to_s.strip
    end

    def email
      params[:email].to_s.strip
    end

    def send_invitation
      discord_link = ENV.fetch('DISCORD_INVITE_URL', nil)

      if discord_link.blank?
        logger.error('DISCORD_INVITE_URL is not set; cannot send a Discord invitation.')
        return render_error(GENERIC_DELIVERY_ERROR, :internal_server_error)
      end

      DiscordInvitationMailer.invite(name, email, discord_link).deliver_now

      render json: { success: "Thanks, #{name}! Check #{email} for your invitation to our Discord server." },
             status: :ok
    rescue StandardError => e
      logger.error("Failed to deliver Discord invitation to #{email}: #{e.class}: #{e.message}")
      render_error(GENERIC_DELIVERY_ERROR, :internal_server_error)
    end

    def render_error(message, status)
      render json: { error: message }, status: status
    end

    def skip_recaptcha?
      ENV['SKIP_RECAPTCHA'] == 'true' || Rails.env.development?
    end
  end
end
