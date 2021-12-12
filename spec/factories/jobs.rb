# frozen_string_literal: true
FactoryBot.define do
  factory :job do
    company { 'WNB.rb' }
    title { 'Organizer' }
    description { 'Organize WNB.rb' }
    link { 'link-to-job.com' }
    location { 'Remote' }
  end
end
