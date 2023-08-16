# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Admin::EventsController, type: :controller do
  describe 'GET #index' do
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

  describe 'GET #edit' do
    context 'when user is not authenticated' do
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 401' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, :admin) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 200' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'PUT #update' do
    context 'when user is not authenticated' do
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        put :update, params: { id: event.id }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 401' do
        post :update, params: { id: event.id }
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, role: User::ADMIN) }
      before { sign_in user }
      let(:event) { FactoryBot.create(:event) }

      it 'returns 302' do
        post :update, params: { id: event.id, event: { description: 'Great event' } }
        expect(response).to redirect_to(admin_events_path)
        event.reload
      end
    end
  end

  describe 'GET #new' do
    it 'assigns a new event to @event' do
      get :new
      expect(response).to have_http_status(302)
    end
  end

  describe 'POST #create' do
    context 'when user is not authenticated' do
      it 'returns 302' do
        post :create
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { FactoryBot.create(:user) }
      before { sign_in user }

      it 'returns 401' do
        post :create
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { FactoryBot.create(:user, :admin) }
      before { sign_in user }

      it 'returns 302' do
        post :create,
             params: {
               event: {
                 title: 'My event',
                 description: 'Great event',
                 date: 1.month.from_now,
                 type: 'Meetup',
               },
             }

        expect(response).to redirect_to(admin_events_path)
      end
    end
  end

  describe '#delete' do
    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
      let(:event) { create(:event) }

      before(:each) { sign_in user }

      it 'redirects to index page when event exists' do
        delete :destroy, params: { id: event.id }
        expect(response).to redirect_to(admin_events_path)
        expect(Event.exists?(event.id)).to be(false)
      end

      it 'returns 404 when the event does not exist' do
        delete :destroy, params: { id: 'fakefake' }
        expect(response).to have_http_status(404)
      end
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }
      let(:event) { create(:event) }

      before(:each) { sign_in user }

      it 'returns 401' do
        delete :destroy, params: { id: event.id }
        expect(response).to have_http_status(401)
        expect(Event.exists?(event.id)).to be(true)
      end
    end

    context 'when no logged-in user' do
      let(:event) { create(:event) }

      it 'redirects to login' do
        delete :destroy, params: { id: event.id }
        expect(response).to redirect_to(new_user_session_path)
        expect(Event.exists?(event.id)).to be(true)
      end
    end
  end
end
