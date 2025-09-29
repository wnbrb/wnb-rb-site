# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'logger'        # Ensures that ::Logger exists before ActiveSupport
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
