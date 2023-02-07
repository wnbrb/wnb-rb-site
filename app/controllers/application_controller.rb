# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Pundit::Authorization

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from Pundit::NotAuthorizedError, with: :render_unauthorized

  private

  def render_unauthorized
    render status: 401, json: {}
  end

  def render_not_found
    render(file: "#{Rails.root}/public/404.html", status: :not_found)
  end

  protected

  def after_sign_in_path_for(_users)
    admin_dashboard_path
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
