# frozen_string_literal: true
FactoryBot.define do
  factory :speaker do
    name { Faker::Name.name }
    bio { Faker::Lorem.paragraph }
    tagline { Faker::Job.title }
    image_url { Faker::Internet.url }
  end

  after(:build) { |_speaker| allow(HTTParty).to receive(:get).and_return(double(code: 200)) }

  trait :with_invalid_links do
    after(:build) { |_speaker| allow(HTTParty).to receive(:get).and_return(double(code: 401)) }
    links { { notwitter: 'not-a-link', twitter: Faker::Internet.url } }
  end

  trait :with_valid_links do
    links { { twitter: Faker::Internet.url, other: Faker::Internet.url } }
  end

  trait :with_empty_links do
    links { {} }
  end
end
