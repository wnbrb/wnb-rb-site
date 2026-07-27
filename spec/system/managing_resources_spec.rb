# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Managing resources', type: :system do
  let!(:resource) { create :resource }
  let(:user) { create :user, :admin }

  before do
    driven_by(:rack_test)

    login_as user
    visit admin_resources_path
  end

  it 'lists resources' do
    expect(page).to have_text(resource.title)
  end

  context 'creates a resource' do
    before { click_on 'Create new Resource' }

    it { expect(page).to have_text('New Resource') }

    describe 'with valid data' do
      it 'creates a resource' do
        new_resource = build(:resource)

        fill_in 'Title', with: new_resource.title
        fill_in 'Url', with: new_resource.url
        fill_in 'Description', with: new_resource.description
        select new_resource.category.humanize, from: 'Category'
        fill_in 'Submitted by', with: new_resource.submitted_by

        click_on 'Save'

        expect(page).to have_current_path(admin_resources_path)
        expect(page).to have_text('Resource created successfully.')
        expect(Resource.last.title).to eq(new_resource.title)
      end
    end

    describe 'with invalid data' do
      it 'shows errors' do
        click_on 'Save'

        expect(page).to have_current_path(admin_resources_path)
        expect(page).to have_text("Title can't be blank")
      end
    end
  end

  it 'deletes a resource' do
    expect(page).to have_text(resource.title)

    click_link_or_button 'Delete'

    expect(page).to have_text('Resource deleted.')
    expect(page).not_to have_text(resource.title)
  end

  it 'edits a resource with valid data' do
    click_link 'Edit', href: edit_admin_resource_path(resource)

    fill_in 'Title', with: 'Updated Title'
    click_on 'Save'

    expect(page).to have_text('Resource updated successfully.')
    expect(resource.reload.title).to eq('Updated Title')
  end

  it 'shows errors when updating with invalid data' do
    click_link 'Edit', href: edit_admin_resource_path(resource)

    fill_in 'Title', with: ''
    click_on 'Save'

    expect(page).to have_text("Title can't be blank")
  end
end
