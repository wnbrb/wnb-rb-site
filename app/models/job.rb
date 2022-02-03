# frozen_string_literal: true

class Job < ApplicationRecord
  enum sponsorship_level: %i[opal sapphire emerald ruby], _suffix: true

  validates :company,
            :title,
            :description,
            :link,
            :location,
            :image_url,
            :sponsorship_level,
            presence: true

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
