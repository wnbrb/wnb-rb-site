# frozen_string_literal: true

FactoryBot.define do
  factory :resource do
    title { Faker::Lorem.sentence }
    url { Faker::Internet.url }
    category { Resource::CATEGORIES.sample }
    description { Faker::Lorem.paragraph }
    submitted_by { Faker::Internet.email }
  end
end
