# frozen_string_literal: true
class GivebutterService
  API_ROOT = 'https://api.givebutter.com/v1'
  CACHE_KEY = 'givebutter_campaign_progress'
  CACHE_TTL = 1.minute
  # Keeps a slow or hanging Givebutter response from tying up a Puma thread.
  REQUEST_TIMEOUT = 5

  def campaign_progress
    Rails.cache.fetch(CACHE_KEY, expires_in: CACHE_TTL, skip_nil: true) do
      fetch_campaign_progress
    end
  end

  private

  def fetch_campaign_progress
    return nil if api_key.blank? || campaign_id.blank?

    response = HTTParty.get(
      "#{API_ROOT}/campaigns/#{campaign_id}",
      headers: {
        'Authorization' => "Bearer #{api_key}",
        'Accept' => 'application/json'
      },
      timeout: REQUEST_TIMEOUT
    )

    unless response.code == 200
      Rails.logger.error("Givebutter campaign fetch failed: #{response.code}")
      return nil
    end

    # Unlike the /campaigns list endpoint, this one returns the campaign
    # unwrapped rather than nested under a "data" key.
    campaign = response.parsed_response
    return nil if campaign.blank? || campaign['goal'].blank?

    {
      raised: campaign['raised'],
      goal: campaign['goal'],
      donors: campaign['donors'],
      currency: campaign['currency'],
      url: campaign['url']
    }
  rescue StandardError => e
    Rails.logger.error("Givebutter campaign fetch error: #{e.message}")
    nil
  end

  def api_key
    ENV.fetch('GIVEBUTTER_API_KEY', nil)
  end

  def campaign_id
    ENV.fetch('GIVEBUTTER_CAMPAIGN_ID', nil)
  end
end
