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

  describe 'POST #authenticate' do
    before do
      ENV['JOB_BOARD_PASSWORD'] = 'wnb.rbRULEZ!'
      ENV['JWT_HMAC_SECRET'] = '1234567'
    end

    after do
      ENV['JOB_BOARD_PASSWORD'] = nil
      ENV['JWT_HMAC_SECRET'] = nil
    end

    context 'when password is valid' do
      it 'returns 201 response and sets JWT in cookie' do
        post :authenticate, params: { password: 'wnb.rbRULEZ!' }
        expect(response).to have_http_status(201)
        expect(cookies[:token]).not_to be_nil
      end
    end

    context 'when password is not valid' do
      it 'returns 401 response and does not set cookies' do
        post :authenticate, params: { password: 'invalidpassword' }
        expect(response).to have_http_status(401)
        expect(cookies[:token]).to be_nil
      end
    end
  end
end
