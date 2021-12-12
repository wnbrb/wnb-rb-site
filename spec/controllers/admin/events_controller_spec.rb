# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Admin::EventsController, type: :controller do
  describe '#index' do
    context 'when user is not authenticated' do
      it 'returns 302' do
        get :index
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }

      it 'returns 401' do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, role: User::ADMIN) }
      before { sign_in user }

      it 'returns 200' do
        get :index
        expect(response).to have_http_status(200)
      end
    end
  end
end
