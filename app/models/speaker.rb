# frozen_string_literal: true

class Speaker < ApplicationRecord
  include HTTParty
  SOCIAL_MEDIA_LINKS = %w[github linkedin mastodon twitter website other].freeze

  has_many :event_speakers, dependent: :destroy
  has_many :events, through: :event_speakers

  validates :name, :bio, :image_url, presence: true
  validate :links, :validate_social_media_brand
  validate :url_exists?, if: ->(s) { s.links.compact_blank.present? }

  store :links, accessors: SOCIAL_MEDIA_LINKS, coder: JSON

  before_validation :format_links

  scope :ordered_by_name, -> { order(:name) }

  def validate_social_media_brand
    return if links.blank? || links.keys.all? { |key| SOCIAL_MEDIA_LINKS.include?(key) }

    errors.add(:links, 'This social media is not allowed')
  end

  def format_links
    return if links.blank?

    links.transform_keys!(&:downcase)
  end

  def url_exists?
    links.each { |_, url| errors.add(:links, 'This url is not valid') unless url_valid?(url) }
  end

  def empty_links?
    links.compact_blank.empty?
  end

  private

  def url_valid?(url)
    response = HTTParty.get(url)
    response.code == 200
  end
end
