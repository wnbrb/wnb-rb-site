# frozen_string_literal: true
require 'net/http'
require 'json'
require 'uri'

class DiscordClient
  def self.message(text)
    webhook_url = ENV.fetch('DISCORD_WEBHOOK_URL')
    uri = URI.parse(webhook_url)
    payload = { content: text }
    headers = { 'Content-Type' => 'application/json' }

    response = Net::HTTP.post(uri, payload.to_json, headers)
    Rails.logger.info "Discord webhook sent: #{response.code} #{response.body}"
  end
end
