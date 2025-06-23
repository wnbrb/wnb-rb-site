# frozen_string_literal: true
class AdminController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  layout 'admin'

  private

  def user_not_authorized
    flash[:alert] = 'You are not allowed to perform this action'
    redirect_referrer_or_admin
  end

  def redirect_referrer_or_admin
    redirect_to(request.referrer || admin_events_path, status: :unauthorized)
  end
end