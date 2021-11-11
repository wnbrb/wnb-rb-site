# frozen_string_literal: true

class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception
    before_action :configure_permitted_parameters, if: :devise_controller?
  
    protected
  
    def after_sign_in_path_for(users)
      grid_index_path
    end
  
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation, :remember_me) }
      devise_parameter_sanitizer.permit(:sign_in) { |u| u.permit(:email, :password, :remember_me) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit( :name, :email, :password, :password_confirmation, :current_password) }
    end
  
  end
