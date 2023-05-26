# frozen_string_literal: true

module ApplicationHelper
  def canonical_url
    request.base_url + request.path
  end

  def meta_description
    "WNB.rb is a virtual community for women and non-binary Rubyists. We offer a variety of resources and events to
    help you learn, grow, and connect with other Rubyists. Whether you're a beginner or a seasoned pro, we have
    something for you."
  end
end
