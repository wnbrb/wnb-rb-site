# frozen_string_literal: true
module Users
  class PasswordsController < Devise::PasswordsController
    protected

    def after_resetting_password_path_for(resource)
      # mark the flag true right after a successful reset
      resource.update_column(:password_changed, true)
      # send them to the dashboard/home
      admin_dashboard_path   # or admin_events_path
    end
  end
end
