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
      let(:user) { create(:user) }
      before { sign_in user }

      it 'returns 401' do
        get :index
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
      before { sign_in user }

      it 'returns 200' do
        get :index
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'GET #edit' do
    context 'when user is not authenticated' do
      let(:event) { create(:event) }

      it 'returns 302' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }
      before { sign_in user }
      let(:event) { create(:event) }

      it 'returns 401' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
      before { sign_in user }
      let(:event) { create(:event) }

      it 'returns 200' do
        get :edit, params: { id: event.id }
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'PUT #update' do
    context 'when user is not authenticated' do
      let(:event) { create(:event) }

      it 'returns 302' do
        put :update, params: { id: event.id }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }
      before { sign_in user }
      let(:event) { create(:event) }

      it 'returns 401' do
        post :update, params: { id: event.id }
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { create(:user, role: User::ADMIN) }
      before { sign_in user }
      let(:event) { create(:event) }

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
      let(:user) { create(:user) }
      before { sign_in user }

      it 'returns 401' do
        post :create

        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
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

        expect(response).to redirect_to edit_admin_event_path(Event.last)
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

  describe 'GET #set_talk' do
    context 'when user is not authenticated' do
      it 'returns 302' do
        get :set_talk, params: { talk_id: 'new_talk' }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      let(:user) { create(:user) }
      before { sign_in user }

      it 'returns 401' do
        get :set_talk, params: { talk_id: 'new_talk' }
        expect(response).to have_http_status(401)
      end
    end

    context 'when user is admin' do
      let(:user) { create(:user, :admin) }
      before { sign_in user }

      context 'when talk_id is new_talk' do
        it 'assigns a new Talk object to @talk' do
          get :set_talk, params: { talk_id: 'new_talk' }, format: :turbo_stream
          expect(controller.instance_variable_get(:@talk)).to be_a_new(Talk)
        end

        it 'assigns the correct URL to @url' do
          get :set_talk, params: { talk_id: 'new_talk' }, format: :turbo_stream
          expect(controller.instance_variable_get(:@url)).to eq(
            generate_talk_admin_events_path(talk_id: 'create_talk'),
          )
        end
      end

      context 'when talk_id is not new_talk' do
        let!(:talk) { create(:talk, :with_event) }
        before do
          params =
            ActionController::Parameters.new(
              {
                event: {
                  talks_attributes: {
                    talk.id.to_s => {
                      _destroy: false,
                      id: talk.id,
                      speaker_id: talk.speaker.id,
                      event_id: talk.event.id,
                    },
                  },
                },
                talk_id: talk.id.to_s,
              },
            )
          allow(controller).to receive(:params).and_return(params)
        end

        it 'assigns an existing Talk object to @talk' do
          get :set_talk, params: { talk_id: talk.id }, format: :turbo_stream
          expect(controller.instance_variable_get(:@talk)).to eq(talk)
        end

        it 'assigns the correct URL to @url' do
          get :set_talk, params: { talk_id: talk.id }, format: :turbo_stream
          expect(controller.instance_variable_get(:@url)).to eq(
            generate_talk_admin_events_path(talk_id: talk.id),
          )
        end
      end
    end
  end

  describe 'POST #generate_talk' do
    let(:talk) { instance_double(Talk) }
    let(:talk_params) { { foo: 'bar' } }
    let(:user) { create(:user, :admin) }

    before do
      sign_in user
      allow(Talk).to receive(:new).and_return(talk)
      allow(talk).to receive(:object_id).and_return(123)
      allow(controller).to receive(:generate_talk_admin_events_path).and_return(
        '/admin/events/generate_talk',
      )
    end

    context 'when talk is valid' do
      before do
        allow(controller).to receive(:talk_params).and_return(talk_params)
        allow(talk).to receive(:valid?).and_return(true)
        allow(talk).to receive(:id=)
      end

      it 'renders the _card_talk_new template' do
        post :generate_talk, params: { talk_params: talk_params, talk_id: 'example_talk_id' }
        expect(response).to render_template('admin/events/form/_card_talk_new')
      end

      it 'returns a ok status' do
        post :generate_talk, params: { talk_params: talk_params, talk_id: 'example_talk_id' }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when talk is not valid' do
      before do
        allow(controller).to receive(:talk_params).and_return(talk_params)
        allow(talk).to receive(:valid?).and_return(false)
        allow(talk).to receive(:id=)
      end

      it 'renders the set_talk template' do
        post :generate_talk, params: { talk_params: talk_params, talk_id: 'example_talk_id' }
        expect(response).to render_template('admin/events/set_talk')
      end

      it 'returns a bad_request status' do
        post :generate_talk, params: { talk_params: talk_params, talk_id: 'example_talk_id' }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
