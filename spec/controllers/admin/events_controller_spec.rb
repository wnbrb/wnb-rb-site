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
      let(:user) { FactoryBot.create(:user, :admin) }
      before { sign_in user }

      it 'returns 200' do
        get :index
        expect(response).to have_http_status(200)
      end
    end
  end

  describe '#edit' do
    context 'when user is not authenticated' do
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        get :edit, params: {id: event.id}
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 401' do
        get :edit, params: {id: event.id}
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, :admin) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 200' do
        get :edit, params: {id: event.id}
        expect(response).to have_http_status(200)
      end
    end
  end

  describe '#update' do
    context 'when user is not authenticated' do
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        post :update, params: {id: event.id}
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 401' do
        post :update, params: {id: event.id}
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, role: User::ADMIN) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        post :update, params: {id: event.id, meetup: {description: 'Great event'}}
        expect(response).to redirect_to(admin_events_path)
        event.reload
      end
    end
  end

  describe '#delete' do
    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
      let(:event) { create(:event) }

      before(:each) do
        sign_in user
      end

      it 'returns 200 when event exists' do
        delete :destroy, params: {id: event.id}
        expect(response).to have_http_status(200)
      end

      it 'returns 404 when the event does not exist' do
        delete :destroy, params: {id: 'fakefake'}
        expect(response).to have_http_status(404)
      end
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }
      let(:event) { create(:event) }

      before(:each) do
        sign_in user
      end

      it 'returns 403' do
       delete :destroy, params: {id: event.id}
        expect(response).to have_http_status(401)
      end
    end

    context 'when no logged-in user' do
      let(:event) { create(:event) }

      it 'returns 401' do
        delete :destroy, params: {id: event.id}
        expect(response).to have_http_status(401)
      end
    end
  end
end
