# frozen_string_literal: true
FactoryBot.define do
  factory :event, class: Meetup do
    sequence(:title) { |n| "Title #{n}" }
    sequence(:location) { |n| "Location #{n}" }
    sequence(:description) { |n| "Description #{n}" }
    date { 30.days.from_now }

    trait :upcoming do
      date { 1.week.from_now }
    end

    trait :past do
      date { 1.week.ago }
    end
  end
end
