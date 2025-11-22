# frozen_string_literal: true
class DropboxService
  TOKEN_CACHE_KEY = 'dropbox_access_token'
  TOKEN_TTL = 3.hours # Dropbox short-lived token lasts 4 hours

  def initialize
    @access_token = fetch_or_refresh_access_token
    @client = DropboxApi::Client.new(@access_token)
  end

  # Uploads via Dropbox API
  def upload(uploaded_file, dropbox_path)
    @client.upload("/#{dropbox_path}", uploaded_file.read)
  end

 # Generates a public image link (converted to ?raw=1)
def public_url(path)
  return ActionController::Base.helpers.asset_path('blank.png') if path.blank?

  dropbox_path = path.start_with?('/') ? path : "/#{path}"

  begin
    # Check if file exists
    @client.get_metadata(dropbox_path)

    # Create or get shared link
    link = @client.create_shared_link_with_settings(dropbox_path)
  rescue DropboxApi::Errors::SharedLinkAlreadyExistsError
    link = @client.list_shared_links(path: dropbox_path).links.first
  rescue DropboxApi::Errors::NotFoundError
    Rails.logger.warn("Dropbox file not found: #{dropbox_path}")
    return ActionController::Base.helpers.asset_path('blank.png')
  end

  # Convert Dropbox shared link to direct download link
  link.url.gsub(/([?&])dl=0/, '\1raw=1')

  
end



  private

  # --- TOKEN MANAGEMENT ---

  def fetch_or_refresh_access_token
    # Try cached token
    cached = Rails.cache.read(TOKEN_CACHE_KEY)
    return cached if cached.present?

    # Otherwise refresh token from Dropbox
    new_token = refresh_access_token_from_dropbox

    # Cache new token
    Rails.cache.write(TOKEN_CACHE_KEY, new_token, expires_in: TOKEN_TTL)

    new_token
  end

  def refresh_access_token_from_dropbox
    response = HTTParty.post(
      'https://api.dropbox.com/oauth2/token',
      body: {
        grant_type: 'refresh_token',
        refresh_token: ENV.fetch('DROPBOX_REFRESH_TOKEN', nil),
        client_id: ENV.fetch('DROPBOX_APP_KEY', nil),
        client_secret: ENV.fetch('DROPBOX_APP_SECRET', nil)
      }
    )

    unless response.code == 200
      Rails.logger.error("Dropbox refresh failed: #{response.body}")
      raise 'Dropbox Token Refresh Failed'
    end

    response['access_token']
  end
end
