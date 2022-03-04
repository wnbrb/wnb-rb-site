# frozen_string_literal: true

class SlackClient
  def initialize
    @client = Slack::Web::Client.new
  end

  def message_channel(recipient_id:, text:)
    @client.chat_postMessage(channel: recipient_id, text: text, as_user: true)
  end
end
