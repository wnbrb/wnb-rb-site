# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::JobsController, type: :controller do
  describe 'GET #index' do
    before { 3.times { FactoryBot.create(:job) } }

    it 'correctly renders past events' do
      get :index
      expect(response).to have_http_status(200)

      body = JSON.parse(response.body)

      expect(body['data'].length).to eq(3)
      expect(body['data'].first).to include(
        {
          company: 'WNB.rb',
          title: 'Organizer',
          description: 'Organize WNB.rb',
          link: 'link-to-job.com',
          location: 'Remote',
        }.stringify_keys,
      )
    end
  end
end
