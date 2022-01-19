# frozen_string_literal: true
FactoryBot.define do
  factory :event, class: Meetup do
    sequence(:title) { |n| "Title #{n}" }
    sequence(:location) { |n| "Location #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    sequence(:panel_video_link) { |n| "Panel_video_link #{n}" }
    date { 30.days.from_now }
  end
end
