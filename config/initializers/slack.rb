# frozen_string_literal: true

Slack.configure do |config|
  config.token = ENV.fetch('SLACK_OAUTH_TOKEN', nil)
end

Slack::Events.configure do |config|
  config.signing_secret = ENV.fetch('SLACK_SIGNING_SECRET', nil)
end
