# frozen_string_literal: true
FactoryBot.define do
  factory :job do
    company { 'WNB.rb' }
    title { 'Organizer' }
    description { 'Organize WNB.rb' }
    link { 'link-to-job.com' }
    location { 'Remote' }
    image_url { 'https://picsum.photos/200' }
    sponsorship_level { 0 }
  end
end
