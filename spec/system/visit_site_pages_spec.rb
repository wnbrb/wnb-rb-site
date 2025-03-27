# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User visit site pages', type: :system, js: true do
  before do
    stub_const('ENV', ENV.to_hash.merge('JOB_BOARD_PASSWORD' => 'testing'))
    stub_const('ENV', ENV.to_hash.merge('JWT_HMAC_SECRET' => 'testing1'))
  end
  it 'visits home page' do
    visit root_path
    expect(page).to have_text('A virtual community for women & non-binary Rubyists')
  end

  it 'visits join_us page' do
    visit join_us_path
    expect(page).to have_text('Join')
  end

  it 'visits meetups page' do
    visit meetups_path
    expect(page).to have_text('Meetups')
  end

  it 'visits past meetup today' do
    meetup = create(:event, date: Date.today - 30.days)

    visit "/meetups/#{meetup.date.year}/#{meetup.date.month}/#{meetup.date.day}"

    expect(page).to have_current_path("/meetups/#{meetup.date.year}/#{meetup.date.month}/#{meetup.date.day}")
  end

  it 'visits past meetup and displays speaker with valid links' do
    meetup = create(:event, date: Date.new(2024, 2, 17), title: 'Meetup February 2024')
    speaker = create(:speaker, :with_valid_links)
    speaker2 = create(:speaker, :with_valid_links, links: {mastodon: Faker::Internet.url})
    create(:talk, speaker: speaker, event: meetup)
    create(:talk, speaker: speaker2, event: meetup)

    visit "/meetups/#{meetup.date.year}/#{meetup.date.month}/#{meetup.date.day}"

    expect(page).to have_link(href: speaker2.links['mastodon'].to_s, exact: true)
    expect(meetup.speakers.count).to eq(2)
  end

  it 'visits past meetup and displays available valid links speaker only' do
    meetup = create(:event, date: Date.new(2024, 2, 17), title: 'Meetup February 2024')
    speaker = create(:speaker, links: { mastodon: Faker::Internet.url })
    create(:talk, speaker: speaker, event: meetup)

    visit "/meetups/#{meetup.date.year}/#{meetup.date.month}/#{meetup.date.day}"

    expect(page).not_to have_link(href: speaker.links['twitter'].to_s, exact: true)
    expect(meetup.speakers.count).to eq(1)
  end

  context 'visit to unknown path' do
    before do
      method = Rails.application.method(:env_config)
      allow(Rails.application).to receive(:env_config).with(no_args) do
        method.call.merge(
          'action_dispatch.show_exceptions' => true,
          'action_dispatch.show_detailed_exceptions' => false,
          'consider_all_requests_local' => false
        )
      end
    end

    it 'responds with not found page' do
      visit '/nonexistentpath'

      expect(page).to have_text('404')
    end
  end
end
