# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Admin login system', type: :system do
  before do
    driven_by(:rack_test)
  end

  context 'admin registered' do
    let(:email) { 'admin@wnb.rb' }
    let(:password) { 'password' }
    let(:user) { create(:user, :admin, email: email, password: password) }

    context 'admin not logged in' do
      it 'redirects to the password change page if password has not been changed' do
        visit '/admin'
        fill_in 'Email', with: user.email
        fill_in 'Password', with: user.password
        click_button 'Log in'

        expect(page).to have_current_path(edit_user_registration_path)
      end
    end

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

    it 'redirects to the password change page if user has default password' do
      default_password = 'adminpassword123%'
      user.update!(password: default_password) 

      visit '/admin'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: default_password
      click_button 'Log in'

      expect(page).to have_current_path(edit_user_registration_path)
    end

    it 'redirects to the admin dashboard if user has a custom password' do
      user.update!(password: 'mycustompassword')

      visit '/admin'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'mycustompassword'
      click_button 'Log in'

      expect(page).to have_current_path(admin_dashboard_path)
    end


    it 'enables me to logout from WNB.rb admin' do
      login_as user

      visit admin_dashboard_path
      click_on 'Sign out'

      expect(page).to have_current_path(root_path)
    end
  end

  private

  def extract_reset_password_url(email)
    body = email.body.raw_source
    body.match(/href="([^"]+)"/)[1]
  end
end
