# frozen_string_literal: true
FactoryBot.define do
  factory :job do
    company { 'WNB.rb' }
    title { 'Organizer' }
    description { 'Organize WNB.rb' }
    link { 'link-to-job.com' }
    location { 'Remote' }
    image_url { 'https://picsum.photos/200' }
    image_url { 'aws.amazon.com/link-to-image.png' }
  end
end
