# frozen_string_literal: true
require 'net/http'
require 'json'
require 'uri'

class DiscordClient
  
  def self.message(text)
    WEBHOOK_URL = ENV.fetch('DISCORD_WEBHOOK_URL')
    uri = URI.parse(WEBHOOK_URL)
    payload = { content: text }
    headers = { 'Content-Type' => 'application/json' }

    response = Net::HTTP.post(uri, payload.to_json, headers)
    Rails.logger.info "Discord webhook sent: #{response.code} #{response.body}"
  end
end
