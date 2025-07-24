# frozen_string_literal: true
class DiscordInvitationMailer < ApplicationMailer
  def invite(name, email, discord_link)
    @name = name
    @discord_link = discord_link
    mail(to: email, subject: 'You\'re invited to join our Discord server!')
  end
end
