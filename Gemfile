# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 3.0'

gem 'devise'

gem 'jbuilder', '~> 2.7'
gem 'pg', '~> 1.4.5'
gem 'puma', '~> 5.6'
gem 'rails', '~> 7.0'
gem 'sass-rails', '>= 6'
gem 'slack-ruby-client'
gem 'webpacker', '~> 6.0.0.rc.6'

gem 'bootsnap', '>= 1.4.4', require: false
gem 'jwt', '>= 2.6.0'
gem 'pundit', '>= 2.3.0'

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails', '~> 1.2.1'

gem 'cssbundling-rails', '~> 1.1'
gem 'jsbundling-rails', '~> 1.1'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails', '~> 6.0.1'
  # Necessary for tests to pass: https://github.com/rails/rails/issues/41502
  gem 'pry-rails', '~> 0.3.9'
  gem 'rexml', '~> 3.2.5'
end

group :development do
  gem 'debug', '~> 1.7.1'
  gem 'listen', '~> 3.3'
  gem 'prettier', '~> 2.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'rubocop', '~> 1.22'
  gem 'web-console', '>= 4.1.0'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'factory_bot_rails', '~> 6.2.0'
  gem 'selenium-webdriver', '~> 4.0'
  gem 'timecop', '~> 0.9.6'
  gem 'webdrivers', '~>5.2.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
