require "rails_helper"

RSpec.describe "Admin login system", type: :system do

  before do
    driven_by(:rack_test)
  end

  it "enables me to register to WNB.rb as admin" do
    visit new_user_registration_path

    fill_in "Your Name", with: "Person"
    fill_in "Email", with: "admin@wnb.rb"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    click_button "Sign up"

    expect(page).to have_text("Welcome!")
  end

  context "admin registered" do
    let(:email) { "admin@wnb.rb" }
    let(:password) { "password" }

    let(:user) do
      create(:user, email: email, password: password)
    end

    context "admin not logged in" do

      it "enables me to login to WNB.rb admin" do
        visit "/admin"

        fill_in "Email", with: user.email
        fill_in "Password", with: user.password
        click_button "Log in"

        expect(page).to have_text("Signed in successfully")
      end

    end

    context "admin is logged in" do

      it "enables me to logout from WNB.rb admin" do
        login_as user

        visit admin_dashboard_path

        click_on "Sign out"

        expect(page).to have_current_path(root_path)
      end

    end

    it "enables me to reset WNB.rb admin password" do
      token = user.send_reset_password_instructions

      visit edit_user_password_path(reset_password_token: token)

      fill_in "New password", with: "password1"
      fill_in "Confirm new password", with: "password1"

      click_button "Change my password"

      expect(page).to have_text("Your password has been changed successfully")
    end
  end

end
