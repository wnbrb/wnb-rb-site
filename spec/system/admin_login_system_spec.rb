require "rails_helper"

RSpec.describe "Admin login system", type: :system do

  before do
    driven_by(:rack_test)
  end

  context "admin not logged in" do

    it "enables me to login to WNB.rb admin" do
      visit "/admin"

      fill_in "Email", with: "admin@wnb.rb"
      fill_in "Password", with: "password"
      click_button "Sign In"

      expect(page).to have_text("successfully logged in")
    end

    it "enables me to register to WNB.rb as admin" do
      visit "/admin/sign_up"

      fill_in "Email", with: "admin@wnb.rb"
      fill_in "Password", with: "password"
      fill_in "Confirm Password", with: "password"
      click_button "Register"

      expect(page).to have_text("successfully registered")
    end

  end

  context "admin is logged in" do

    it "enables me to logout from WNB.rb admin" do
      visit "/admin/sign_out"

      expect(page).to have_text("successfully logged out")
    end

  end

  it "enables me to reset WNB.rb admin password" do
    visit "/admin/password/new"

    fill_in "Current Password", with: "password"
    fill_in "New Password", with: "password1"
    fill_in "Confirm New Password", with: "password1"

    click_button "Reset Password"

    expect(page).to have_text("successfully reset password")
  end

end
