# frozen_string_literal: true

class Job < ApplicationRecord
  SPONSORSHIP_LEVELS = { RUBY: 0, EMERALD: 1, SAPPHIRE: 2, OPAL: 3 }.freeze

  validates :company,
            :title,
            :description,
            :link,
            :location,
            :image_url,
            :sponsorship_level,
            presence: true

  validates :sponsorship_level, inclusion: { in: SPONSORSHIP_LEVELS.values }

  def as_json
    {
      id: id,
      title: title,
      company: company,
      description: description,
      location: location,
      link: link,
      image_url: image_url,
    }
  end
end
