# frozen_string_literal: true

class Speaker < ApplicationRecord
  has_many :event_speakers, dependent: :destroy
  has_many :events, through: :event_speakers

  validates :name, :bio, presence: true
end
