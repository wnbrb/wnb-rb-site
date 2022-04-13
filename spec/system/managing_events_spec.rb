# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Managing events', type: :system do
  let!(:event) { create :event }
  let(:user) { create :user, :admin }

  before do
    driven_by(:rack_test)
  end

  it 'can delete events' do
    login_as user
    visit admin_events_path
    expect(page).to have_text(event.title)

    click_link_or_button 'Delete'
    expect(page).to have_text('Event successfully deleted')
    expect(page).not_to have_text(event.title)
  end
end
