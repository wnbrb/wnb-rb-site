# frozen_string_literal: true

# == Schema Information
#
# Table name: jobs
#
#  id                :bigint           not null, primary key
#  company           :string
#  description       :text
#  image_url         :string
#  link              :string
#  location          :string
#  sponsorship_level :integer
#  title             :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
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
