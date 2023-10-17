# frozen_string_literal: true
FactoryBot.define do
  factory :talk do
    association :speaker
    association :event, factory: :event, strategy: :build
    talk_title { Faker::Lorem.sentence }
    talk_description { Faker::Lorem.paragraph }

    trait :with_event do
      before(:create) do |talk|
        event = create(:event)
        event.talks << talk
      end

      before(:build) do |talk|
        event = build(:event)
        event.talks << talk
      end
    end
  end
end
