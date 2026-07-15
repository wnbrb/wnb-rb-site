# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::FundraisingController, type: :controller do
  let(:service) { instance_double(GivebutterService) }

  before { allow(GivebutterService).to receive(:new).and_return(service) }

  describe 'GET #show' do
    context 'when the campaign progress is available' do
      let(:progress) do
        {
          raised: 1285,
          goal: 30_000,
          donors: 8,
          currency: 'USD',
          url: 'https://givebutter.com/wnbrb-our-next-chapter'
        }
      end

      before { allow(service).to receive(:campaign_progress).and_return(progress) }

      it 'returns 200 response' do
        get :show, format: :json

        expect(response).to have_http_status(200)
      end

      it 'returns the campaign progress' do
        get :show, format: :json

        expect(JSON.parse(response.body)['data']).to include(
          'raised' => 1285,
          'goal' => 30_000,
          'donors' => 8,
          'currency' => 'USD'
        )
      end
    end

    context 'when the campaign progress is unavailable' do
      before { allow(service).to receive(:campaign_progress).and_return(nil) }

      it 'returns 503 response' do
        get :show, format: :json

        expect(response).to have_http_status(503)
      end
    end
  end
end
