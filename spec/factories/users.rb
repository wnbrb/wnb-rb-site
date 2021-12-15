# frozen_string_literal: true
FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@email.com" }
    sequence(:name) { |n| "Person #{n}" }
    password { 'somepassword' }
  end
end
