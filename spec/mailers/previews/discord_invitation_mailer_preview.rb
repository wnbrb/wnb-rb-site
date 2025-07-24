# frozen_string_literal: true
# Preview all emails at http://localhost:3000/rails/mailers/discord_invitation_mailer_mailer
class DiscordInvitationMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/discord_invitation_mailer_mailer/invite
  def invite
    DiscordInvitationMailer.invite('Emily', 'emily@wnb-rb.dev', ENV['DISCORD_INVITE_URL'] || 'https://discord.gg/example')
  end

end
