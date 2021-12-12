# frozen_string_literal: true

class Job < ApplicationRecord
  validates :company, :title, :description, :link, :location, presence: true
end
