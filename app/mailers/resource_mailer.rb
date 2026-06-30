# frozen_string_literal: true

class ResourceMailer < ApplicationMailer
  def suggestion(title:, url:, description: nil, category: nil, submitted_by: nil)
    @title = title
    @url = url
    @description = description
    @category = category
    @submitted_by = submitted_by
    mail(
      to: 'organizers@wnb-rb.dev',
      subject: @title
    )
  end
end
