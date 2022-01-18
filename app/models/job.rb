# frozen_string_literal: true

class Job < ApplicationRecord
  validates :company, :title, :description, :link, :location, :image_url, presence: true
end
