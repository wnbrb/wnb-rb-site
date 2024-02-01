# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Custom donation system', type: :system, js: true do
  before do
    visit donate_path
  end

  describe 'user inputs custom donation amount' do
    context 'user inputs an integer' do
      it 'updates donate button text entered amount' do
        find('#other').click
        fill_in('Other', with: '40')
        expect(page).to have_button('Donate $40')
      end

      it 'does not update button text if amount is 0' do
        find('#other').click
        fill_in('Other', with: '0')
        expect(page).to have_button('Donate')
      end

      it 'opens a new window when donate button is clicked' do
        allow(Stripe::Checkout::Session).to receive(:create).and_return(double(url: ''))
        find('#other').click
        fill_in('Other', with: '40')
        click_on 'Donate $40'
        expect(page.driver.browser.window_handles.size).to eq 2
      end
    end

    context 'user inputs non-integer' do
      it 'updates donate button to ask for a dollar amount' do
        find('#other').click
        fill_in('Other', with: 'not number')
        expect(page).to have_button('Please enter a dollar amount')
      end
    end
  end
end