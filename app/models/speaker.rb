# frozen_string_literal: true

# == Schema Information
#
# Table name: speakers
#
#  id         :bigint           not null, primary key
#  bio        :text
#  image_url  :string
#  links      :jsonb
#  name       :string
#  tagline    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Speaker < ApplicationRecord
  include HTTParty
  SOCIAL_MEDIA_LINKS = %w[github linkedin mastodon twitter website other].freeze

  has_many :talks, dependent: :destroy
  has_many :events, through: :talks

  validates :name, :bio, :image_url, presence: true
  validate :links, :validate_social_media_brand
  validate :url_exists?, if: ->(s) { s.links.compact_blank.present? }

  store :links, accessors: SOCIAL_MEDIA_LINKS, coder: JSON

  before_validation :format_links

  default_scope { order(name: :asc) }

  def validate_social_media_brand
    return if links.blank? || links.keys.all? { |key| SOCIAL_MEDIA_LINKS.include?(key) }

    errors.add(:links, 'This social media is not allowed')
  end

  def format_links
    return if links.blank?

    links.transform_keys!(&:downcase)
  end

  def url_exists?
    links.each do |key, raw_url|
    next if raw_url.blank?
    errors.add(:links, "Url not valid: #{key} - #{raw_url}") unless url_valid?(raw_url)
  end
  end

  def empty_links?
    links.compact_blank.empty?
  end

  private

  def url_valid?(raw_url)
    return true if raw_url.blank?

    url = normalize_url(raw_url)
    uri = URI.parse(url)

    return false unless uri.is_a?(URI::HTTP) && uri.host.present?

    options = {
      timeout: 4,
      follow_redirects: true,
      maintain_method_across_redirects: true,
      headers: { 'User-Agent' => 'Rails-Link-Validator' }
    }

    begin
      response = HTTParty.head(uri.to_s, **options)
      response = HTTParty.get(uri.to_s, **options) if response.code == 405
      response.code.between?(200, 399)
    rescue HTTParty::Error,
         SocketError,
         Timeout::Error,
         Errno::ECONNREFUSED,
         Errno::EHOSTUNREACH,
         OpenSSL::SSL::SSLError => e
      Rails.logger.warn("URL check failed for #{uri}: #{e.class}: #{e.message}")
      false
    end
  end

  def normalize_url(raw_url)
    url = raw_url.to_s.strip
    return url if url.start_with?('http://', 'https://')
    "https://#{url}"
  end
end
