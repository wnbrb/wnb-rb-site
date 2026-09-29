# frozen_string_literal: true

# == Schema Information
#
# Table name: resources
#
#  id           :bigint           not null, primary key
#  category     :string           not null
#  description  :text
#  submitted_by :string
#  title        :string           not null
#  url          :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Resource < ApplicationRecord
  CATEGORIES = %w[article book podcast video talk newsletter tool project].freeze

  validates :title, :url, :category, :submitted_by, presence: true
  validates :category, inclusion: { in: CATEGORIES }
  validate :url_format

  scope :by_category, ->(category) { where(category: category) if category.present? }
  scope :recent, -> { order(created_at: :desc) }

  def as_json
    {
      id: id,
      title: title,
      url: url,
      description: description,
      category: category,
      submitted_by: submitted_by,
      created_at: created_at,
    }
  end

  private

  def url_format
    return if url.blank?

    uri = URI.parse(url)
    errors.add(:url, 'is not a valid URL') unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    errors.add(:url, 'is not a valid URL')
  end
end
