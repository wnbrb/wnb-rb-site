# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
  def update
    super do |resource|
      resource.update_column(:password_changed, true) if resource.encrypted_password_previously_changed?
    end
  end

  protected

  def after_update_path_for(_resource)
    admin_dashboard_path
  end
  end
end
