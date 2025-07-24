# frozen_string_literal: true
require 'rails_helper'

RSpec.describe DiscordInvitationMailer, type: :mailer do
  describe 'invite' do
    let(:mail) { DiscordInvitationMailer.invite('RubyFriend', 'to@example.org', 'https://discord.gg/example') }

    it 'renders the headers' do
      expect(mail.subject).to eq('You\'re invited to join our Discord server!')
      expect(mail.to).to eq(['to@example.org'])
      expect(mail.from).to eq(['from@example.com'])
    end
  end
end
