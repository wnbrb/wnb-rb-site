# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Admin::EventsController, type: :controller do
  describe '#index' do
    before { sign_in user }

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }

      it 'returns 401' do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, role: User::ADMIN) }

      it 'returns 200' do
        get :index
        expect(response).to have_http_status(200)
      end
    end
  end
end
