# frozen_string_literal: true
class ApplicationController < ActionController::Base
  include Pundit::Authorization

  RECAPTCHA_MINIMUM_SCORE= 0.5

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized

  def render_not_found
    respond_to do |format|
    format.html { render('not_found', status: :not_found) }
    format.json { render json: { error: 'Not Found' }, status: :not_found }
    format.any  { head :not_found }
   end
  end

  private

  def render_unauthorized
    render status: 401, json: {}
  end

  def validate_recaptcha(token_recaptcha)
    return false unless ENV.fetch('RECAPTCHA_ENABLED', false)
      recap_uri = URI.parse('https://www.google.com/recaptcha/api/siteverify')
      recap_params = { secret: ENV.fetch('RECAPTCHA_SECRET_KEY', nil), response: token_recaptcha }
      response = Net::HTTP.post_form(recap_uri, recap_params)
      logger.info "Recaptcha result: #{response.code} / #{response.body}"
      response_json = JSON.parse(response.body) if response.code == '200'

      response.code == '200' && response_json['success'] && response_json['score'] >= RECAPTCHA_MINIMUM_SCORE
  end

  protected

  def after_sign_in_path_for(user)
    if user.password_changed?
      admin_dashboard_path
    else
      edit_user_registration_path
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit(:name, :email, :password, :password_confirmation, :remember_me)
    end
    devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:email, :password, :remember_me) }
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:name, :email, :password, :password_confirmation, :current_password)
    end
  end
end
