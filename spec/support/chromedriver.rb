# frozen_string_literal: true

require 'selenium-webdriver'
# Next line turn on logging to see what Selenium Manager is doing, in case of errors
# Selenium::WebDriver.logger.level = :debug

# Capybara.register_driver :chrome do |app|
#   Capybara::Selenium::Driver.new(app, browser: :chrome)
# end

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument '--window-size=1680,1050'
  options.add_argument '--headless'
  # options.add_argument '--no-sandbox'
  options.add_argument '--disable-gpu'
  options.add_argument '--disable-dev-shm-usage'

  Capybara::Selenium::Driver.new app, browser: :chrome, options: options
end

Capybara.javascript_driver = :headless_chrome

RSpec.configure do |config|
  config.before(:each, type: :system, js: true) { driven_by Capybara.javascript_driver }

  config.after(:each, type: :system) do
    Capybara.reset_sessions!
    page.driver.reset!
  end
end
