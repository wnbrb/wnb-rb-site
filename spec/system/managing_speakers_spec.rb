# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Managing speakers', type: :system do
  let(:admin) { create(:user, :admin) }
  let!(:speaker) { create(:speaker) }

  
  before do
    # Stub Dropbox
    allow(DropboxService).to receive(:new).and_return(
      instance_double(
        DropboxService,
        upload: true,
        public_url: "https://example.com/fake-image.png"
      )
    )

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
        attach_file 'Upload Image', Rails.root.join('test/fixtures/files/test-image.png')


        click_on 'Save'
       expect(page).to have_text('Speaker created successfully.')
       expect(page).to have_current_path(admin_speakers_path)

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

  it 'edits a speaker with valid data' do
    click_link 'Edit', href: edit_admin_speaker_path(speaker)

    fill_in 'Name', with: 'Updated Name'
    click_on 'Save'

    expect(page).to have_text('Speaker updated successfully.')
    expect(speaker.reload.name).to eq('Updated Name')
  end

  it 'shows errors when updating with invalid data' do
    click_link 'Edit', href: edit_admin_speaker_path(speaker)

    fill_in 'Name', with: ''
    click_on 'Save'

    expect(page).to have_text("Name can't be blank")
  end

  context 'pagination' do
    before do
      create_list(:speaker, 20)
      visit admin_speakers_path
    end

    it 'shows pagination navigation' do
      expect(page).to have_selector('.pagy-bootstrap-nav')
    end

    it 'limits rows to 15 per page' do
      within('#speakers tbody') do
        expect(page).to have_selector('tr', count: 15)
      end
    end
  end
end
