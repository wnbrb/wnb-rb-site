# frozen_string_literal: true

# Load the Rails application.
require_relative 'application'

# TODO: Restore deprecations warning after upgrading to Rails 7.2
# Temporarily silence the deprecation warnings
Rails.application.deprecators.silence do
  # Initialize the Rails application.
  Rails.application.initialize!
end
