# frozen_string_literal: true

class Event < ApplicationRecord
  has_many :event_speakers, dependent: :destroy
  has_many :speakers, through: :event_speakers

  validates :title, :location, :date, presence: true

  scope :by_event_date, -> { order(date: :desc) }

  scope :by_month_year,
        ->(month, year) {
          first_day = Date.new(year, month, 1)
          last_day = Date.new(year, month, 1).next_month - 1.second
          where(date: first_day..last_day)
        }
end
