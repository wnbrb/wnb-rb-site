# frozen_string_literal: true

Slack.configure do |config|
  config.token = ENV['SLACK_OAUTH_TOKEN']
end

Slack::Events.configure do |config|
  config.signing_secret = ENV['SLACK_SIGNING_SECRET']
end
