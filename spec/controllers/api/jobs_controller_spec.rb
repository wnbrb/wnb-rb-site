# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::JobsController, type: :controller do
  before do
    ENV['JOB_BOARD_PASSWORD'] = 'wnb.rbRULEZ!'
    ENV['JWT_HMAC_SECRET'] = '1234567'
  end

  after do
    ENV['JOB_BOARD_PASSWORD'] = nil
    ENV['JWT_HMAC_SECRET'] = nil
  end

  describe 'GET #index' do
    before { request.headers['Authorization'] = "Bearer #{token}" }

    context 'when expired bearer token is provided' do
      let(:token) do
        JWT.encode({ data: '', exp: (Time.now - 1.day).to_i }, ENV.fetch('JWT_HMAC_SECRET', nil), 'HS256')
      end

      it 'returns 401 response' do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'when invalid bearer token is provided' do
      let(:token) do
        JWT.encode({ data: '', exp: (Time.now + 1.day).to_i }, 'random_secret', 'HS256')
      end

      it 'returns 401 response' do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'when valid bearer token is provided' do
      let(:token) do
        JWT.encode({ data: '', exp: (Time.now + 1.day).to_i }, ENV.fetch('JWT_HMAC_SECRET', nil), 'HS256')
      end

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
        expect(body['data'].first).not_to have_key('sponsorship_level')
      end
    end
  end

  describe 'POST #authenticate' do
    context 'when password is valid' do
      it 'returns 201 response and returns JWT' do
        post :authenticate, params: { password: 'wnb.rbRULEZ!' }
        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body)['token']).not_to be_nil
      end
    end

    context 'when password is not valid' do
      it 'returns 401 response and does not return token' do
        post :authenticate, params: { password: 'invalidpassword' }
        expect(response).to have_http_status(401)
        expect(JSON.parse(response.body)['token']).to be_nil
      end
    end
  end
end
