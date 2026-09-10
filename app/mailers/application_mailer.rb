# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('MAILER_FROM_ADDRESS', 'WNB.rb <exec@wnb-rb.dev>')
  layout 'mailer'
end
