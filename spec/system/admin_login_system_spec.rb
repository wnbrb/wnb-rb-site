# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Admin login system', type: :system do
  before do
    driven_by(:rack_test)
  end

  it 'enables me to register to WNB.rb as admin' do
    visit new_user_registration_path

    fill_in 'Your Name', with: 'Person'
    fill_in 'Email', with: 'admin@wnb.rb'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'

    expect(page).to have_current_path(admin_dashboard_path)
    expect(page).to have_text('Welcome!')
  end

  context 'admin registered' do
    let(:email) { 'admin@wnb.rb' }
    let(:password) { 'password' }
    let(:user) { create(:user, :admin, email: email, password: password) }

    it 'enables me to reset WNB.rb admin password' do
      visit new_user_password_path

      fill_in 'Email', with: user.email
      click_button 'Send me reset password instructions'

      reset_password_email = ActionMailer::Base.deliveries.last
      reset_password_url = extract_reset_password_url(reset_password_email)

      visit reset_password_url

      fill_in 'New password', with: 'password$1'
      fill_in 'Confirm new password', with: 'password$1'
      click_button 'Change my password'

      expect(page).to have_text('Your password has been changed successfully')
    end

    context 'admin not logged in' do
      it 'enables me to login to WNB.rb admin' do
        visit '/admin'

        fill_in 'Email', with: user.email
        fill_in 'Password', with: user.password

        click_button 'Log in'

        expect(page).to have_current_path(admin_events_path)
        expect(page).to have_text('Signed in successfully')
      end
    end

    context 'admin is logged in' do
      before { create_list(:event, 20) }

      it 'enables me to logout from WNB.rb admin' do
        login_as user

        visit admin_dashboard_path
        click_on 'Sign out'

        expect(page).to have_current_path(root_path)
      end

      it 'shows events with pagy' do
        login_as user

        visit admin_dashboard_path
        click_link 'Events'
        expect(page).to have_selector('.pagy-bootstrap-nav')

        #check by count events data by row in table
        within('#events tbody') do
          expect(page).to have_selector('tr', count: 15)
        end
      end
    end
  end

  private

  def extract_reset_password_url(email)
    body = email.body.raw_source
    body.match(/href="([^"]+)"/)[1]
  end
end
