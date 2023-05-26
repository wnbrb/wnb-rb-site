# frozen_string_literal: true

module ApplicationHelper
  def canonical_url
    request.base_url + request.path
  end
end
