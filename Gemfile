# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 3.3.4'

gem 'devise', '~>4.9.3'

gem 'jbuilder', '~> 2.7'
gem 'pg', '~> 1.5'
gem 'puma', '~> 6.4.3'
gem 'rails', '~> 7.0.8'

# Use Sass to process CSS
gem 'sassc-rails', '~> 2.1.2'

# Use package.json to manage dependencies
gem 'package_json', '~> 0.1.0'
gem 'shakapacker', '= 8.0.2'

gem 'bootsnap', '>= 1.18.4', require: false
gem 'jwt', '>= 2.6.0'
gem 'pundit', '>= 2.3.0'

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails', '~> 1.3.4'

gem 'cssbundling-rails', '~> 1.1'
gem 'jsbundling-rails', '~> 1.1'

gem 'turbo-rails', '~> 1.5.0'

# cuts off a string of HTML
gem 'truncate_html', '~> 0.9.3'

# quickly call web links
gem 'httparty', '~> 0.23.1'

# pagination
gem 'pagy', '~> 6.2'

# timezones
gem 'tzinfo-data', '~> 2.0',platforms: %i[mingw mswin x64_mingw jruby]

# Explicitly depend on and compile nokogiri
# so we can run CI on Ruby head
gem 'nokogiri', '~> 1.18', force_ruby_platform: true

group :development, :test do
  # Annotate models, routes, fixtures, and others based on the database schema
  gem 'annotate', '~> 3.2.0'

  # Call 'byebug' anywhere in the code to stop execution and get a
  # debugger console
  gem 'byebug', '~> 11.1.3', platforms: %i[mri mingw x64_mingw]

  # Generates fake data
  gem 'faker', '~> 2.18.0'

  # Runtime developer console
  gem 'pry-rails', '~> 0.3.9'

  # Run tests
  gem 'rails-controller-testing', '~> 1.0.5'
  gem 'rspec-rails', '~> 7.0.0'
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
  gem 'capybara', '>=3.39.2'
  gem 'factory_bot_rails', '~> 6.4.3'
  gem 'launchy', '~>3.0.1'
  gem 'selenium-webdriver', '~> 4.24'
  gem 'shoulda-matchers', '~>5.3.0'
end

# bug deprecate gems not longer in ruby standard warning
gem 'drb', '~> 2.2.1'
gem 'mutex_m', '~> 0.2.0'

# add erb-lint gem
gem 'erb_lint', require: false

# Use Redis for Action Cable
gem 'redis', '~> 4.0'
