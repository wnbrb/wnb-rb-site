# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Managing events', type: :system do
  let!(:event) { create :event }
  let(:user) { create :user, :admin }

  before do
    driven_by(:rack_test)

    login_as user
    visit admin_events_path
  end

  context 'creates an event' do
    before { click_on 'Create new Event' }

    it { expect(page).to have_text('New Event') }

    describe 'with valid data' do
      it 'creates an event' do
        new_event = build(:event)

        fill_in 'Title', with: new_event.title
        fill_in 'Location', with: new_event.location
        fill_in 'Description', with: new_event.description

        click_on 'Save'

        expect(page).to have_current_path(edit_admin_event_path(Event.last))
        expect(page).to have_text('Event was successfully created')
        expect(Event.last.title).to eq(new_event.title)
      end
    end

    describe 'with invalid data' do
      it 'shows errors' do
        click_on 'Save'

        expect(page).to have_current_path(admin_events_path)
        expect(page).to have_text("Title can't be blank")
      end
    end
  end

  it 'deletes an event' do
    expect(page).to have_text(event.title)

    click_link_or_button 'Delete'

    expect(page).to have_text('Event successfully deleted')
    expect(page).not_to have_text(event.title)
  end

  it 'edits an event with valid data' do
    click_link 'Edit', href: edit_admin_event_path(event)

    fill_in 'Title', with: 'Updated Title'
    click_on 'Save'

    expect(page).to have_text('Event was successfully updated')
    expect(event.reload.title).to eq('Updated Title')
  end

  it 'shows errors when updating with invalid data' do
    click_link 'Edit', href: edit_admin_event_path(event)

    fill_in 'Title', with: ''
    click_on 'Save'

    expect(page).to have_text("Title can't be blank")
  end

  context 'pagination' do
    before do
      create_list(:event, 20)
      visit admin_events_path
    end

    it 'shows pagination navigation' do
      expect(page).to have_selector('.pagy-bootstrap-nav')
    end

    it 'limits rows to 15 per page' do
      within('#events tbody') do
        expect(page).to have_selector('tr', count: 15)
      end
    end
  end
end
