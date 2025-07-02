require "rails_helper"

RSpec.describe DiscordInvitationMailer, type: :mailer do
  describe "invite" do
    let(:mail) { DiscordInvitationMailer.invite }

    it "renders the headers" do
      expect(mail.subject).to eq("Invite")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
