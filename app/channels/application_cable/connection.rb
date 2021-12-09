# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.email
    end

    protected

    # this checks whether a user is authenticated with devise
    # rubocop:disable Lint/AssignmentInCondition
    def find_verified_user
      if verified_user = env['warden'].user
        verified_user
      else
        reject_unauthorized_connection
      end
    end
    # rubocop:enable Lint/AssignmentInCondition
  end
end
