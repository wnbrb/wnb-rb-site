# frozen_string_literal: true

class EventSpeaker < ApplicationRecord
  belongs_to :speaker
  belongs_to :event
end
