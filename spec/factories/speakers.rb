# frozen_string_literal: true
FactoryBot.define do
  factory :speaker do
    name { Faker::Name.name }
    bio { Faker::Lorem.paragraph }
    tagline { Faker::Job.title }
    image_url { Faker::Internet.url }
  end

  trait :with_invalid_links do
    links { { notwitter: 'not-a-link', twitter: Faker::Internet.url } }
  end

  trait :with_valid_links do
    links { { twitter: Faker::Internet.url, other: Faker::Internet.url } }
  end

  trait :with_empty_links do
    links { {} }
  end

  trait :stub_http_ok do
    after(:build) do |_speaker|
      allow(HTTParty).to receive(:head).and_return(double(code: 200))
      allow(HTTParty).to receive(:get).and_return(double(code: 200))
    end
  end
end
