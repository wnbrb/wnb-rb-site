# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('GMAIL_USERNAME', 'from@example.com')
  layout 'mailer'
end
