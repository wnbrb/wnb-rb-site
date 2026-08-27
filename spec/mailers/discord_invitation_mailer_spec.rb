# frozen_string_literal: true
require 'rails_helper'

RSpec.describe DiscordInvitationMailer, type: :mailer do
  describe 'invite' do
    let(:mail) { DiscordInvitationMailer.invite('RubyFriend', 'to@example.org', 'https://discord.gg/example') }

    it 'renders the headers' do
      expect(mail.subject).to eq('You\'re invited to join our Discord server!')
      expect(mail.to).to eq(['to@example.org'])
      expect(mail.from).to eq(['exec@wnb-rb.dev'])
    end

    it 'sends from the address configured for Resend' do
      expect(mail[:from].to_s).to eq('"WNB.rb" <exec@wnb-rb.dev>')
    end

    it 'includes the invite link and recipient name in the body' do
      expect(mail.body.encoded).to include('https://discord.gg/example')
      expect(mail.body.encoded).to include('RubyFriend')
    end
  end
end
