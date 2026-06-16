# frozen_string_literal: true

class Resource < ApplicationRecord
  CATEGORIES = %w[article book podcast video talk newsletter tool project].freeze

  validates :title, :url, :category, presence: true
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
    errors.add(:url, "is not a valid URL") unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    errors.add(:url, "is not a valid URL")
  end
end
