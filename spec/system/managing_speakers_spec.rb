# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Managing speakers', type: :system do
  let(:admin) { create(:user, :admin) }
  let!(:speaker) { create(:speaker) }

  before do
    driven_by(:rack_test)

    login_as admin
    visit admin_speakers_path
  end
  context 'create a speaker' do
    before { click_on 'Create new Speaker' }

    it { expect(page).to have_text('New Speaker') }

    describe 'with valid data' do
      it 'creates an event' do
        new_speaker = build(:speaker)

        fill_in 'Name', with: new_speaker.name
        fill_in 'Bio', with: new_speaker.bio
        fill_in 'Tagline', with: new_speaker.tagline
        fill_in 'Image link', with: new_speaker.image_url

        click_on 'Save'
        expect(page).to have_text('Speaker was successfully created.')
        expect(page).to have_current_path(
          edit_admin_speaker_url(Speaker.find_by(id: Speaker.maximum(:id)).id),
        )
      end
    end

    describe 'with invalid data' do
      it 'shows errors' do
        fill_in 'Name', with: ''

        click_on 'Save'

        expect(page).to have_text("Name can't be blank")
      end
    end
  end
end
