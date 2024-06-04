# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User visit site pages', type: :system, js: true do
  before do
    stub_const('ENV', ENV.to_hash.merge('JOB_BOARD_PASSWORD' => 'testing'))
    stub_const('ENV', ENV.to_hash.merge('JWT_HMAC_SECRET' => 'testing1'))
  end
  it 'visits home page' do
    visit root_path
    expect(page).to have_text('A virtual community for women and non-binary Rubyists')
  end

  it 'visits join_us page' do
    visit join_us_path
    expect(page).to have_text('Join WNB.rb!')
  end

  it 'visits meetups page' do
    visit meetups_path
    expect(page).to have_text('Meetups')
  end

  it 'visits past meetup today' do
    meetup = create(:event, date: Date.today - 30.days)

    visit "/meetups/#{meetup.date.year}/#{meetup.date.month}/#{meetup.date.day}"

    expect(page).to have_text(meetup.title)
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
