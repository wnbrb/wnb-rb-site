# frozen_string_literal: true
require 'factory_bot_rails'
require 'rspec/mocks'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end

FactoryBot::SyntaxRunner.class_eval do 
  include RSpec::Mocks::ExampleMethods
end
