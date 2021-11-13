FactoryBot.define do

  factory :user do
    sequence(:name) { |n| "Person #{n}" }
  end

end
