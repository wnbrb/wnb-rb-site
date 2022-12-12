# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 3.0'

gem 'devise'

gem 'jbuilder', '~> 2.7'
gem 'pg'
gem 'puma', '~> 5.6'
gem 'rails', '~> 7.0'
gem 'sass-rails', '>= 6'
gem 'slack-ruby-client'
gem 'webpacker', '~> 6.0.0.rc.6'

gem 'bootsnap', '>= 1.4.4', require: false
gem 'jwt'
gem 'pundit'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails'
  # Necessary for tests to pass: https://github.com/rails/rails/issues/41502
  gem 'pry-rails'
  gem 'rexml', '~> 3.2.5'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'prettier', '~> 2.0'
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'rubocop', '~> 1.22'
  gem 'web-console', '>= 4.1.0'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'factory_bot_rails'
  gem 'selenium-webdriver'
  gem 'timecop'
  gem 'webdrivers'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
