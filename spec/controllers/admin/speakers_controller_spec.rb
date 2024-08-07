# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Admin::SpeakersController, type: :controller do
  describe 'GET #index' do
    context 'when user is not authenticated' do
      it 'redirects to login page' do
        get :index
        expect(response).to redirect_to(new_user_session_path)
      end
    end
    context 'when user is not admin' do
      it 'returns 401' do
        sign_in create(:user)
        get :index
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is admin' do
      before { create_list(:speaker, 20) }
      before { sign_in create(:user, :admin) }

      it 'returns a success response' do
        get :index
        expect(response).to be_successful
      end

      it 'assigns @speakers and @pagy' do
        get :index
        expect(assigns(:pagy)).to be_a(Pagy)
        expect(assigns(:speakers).size).to eq(15)
      end
    end
  end

  describe 'GET #new' do
    context 'when user is admin' do
      before { sign_in create(:user, :admin) }

      it 'returns a successful response' do
        get :new
        expect(response).to be_successful
      end

      it 'assigns a new speaker to @speaker' do
        get :new
        speaker = controller.instance_variable_get(:@speaker)
        expect(speaker).to be_a(Speaker)
        expect(speaker).to be_new_record
      end
    end
  end

  describe 'GET #edit' do
    let(:speaker) { create(:speaker) }

    context 'when user is not authenticated' do
      it 'redirects to login page' do
        get :edit, params: { id: 1 }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      it 'returns 401' do
        sign_in create(:user)
        get :edit, params: { id: 1 }
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when user is admin' do
      before { sign_in create(:user, :admin) }
      let(:speaker) { FactoryBot.create(:speaker) }

      it 'returns a success response' do
        get :edit, params: { id: speaker.id }
        expect(response).to be_successful
      end

      it 'sets the correct speaker instance variable' do
        get :edit, params: { id: speaker.id }
        expect(controller.instance_variable_get(:@speaker)).to eq(speaker)
      end

      it 'renders not found if speaker is not found' do
        expect { get :edit, params: { id: 'nonexistent_id' } }.to raise_error(
          ActiveRecord::RecordNotFound,
        )
      end
    end
  end

  describe 'POST #create' do
    let(:valid_params) { attributes_for(:speaker) }
    let(:invalid_params) { attributes_for(:speaker, name: nil) }

    context 'when user is not authenticated' do
      it 'returns 302' do
        post :create
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is admin' do
      before { sign_in create(:user, :admin) }
      it 'creates a new speaker with valid params' do
        post :create, params: { speaker: valid_params }
        expect(Speaker.last.name).to eq(valid_params[:name])
        expect(response).to have_http_status(:redirect)
      end

      it 'does not create a new speaker with invalid params' do
        expect { post :create, params: { speaker: invalid_params } }.not_to change(Speaker, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'PATCH #update' do
    context 'when user is not authenticated' do
      it 'redirects to login page' do
        put :update, params: { id: 1 }
        expect(response).to have_http_status(302)
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when user is not admin' do
      before { sign_in create(:user) }
      it 'returns 401' do
        put :update, params: { id: 1 }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is admin' do
      before { sign_in create(:user, :admin) }

      let(:speaker) { create(:speaker) }
      let(:valid_params) { { name: 'Updated Name' } }
      let(:invalid_params) { { name: nil } }

      it 'returns a success response' do
        put :update, params: { id: speaker.id, speaker: { name: 'new name' } }
        expect(response).to redirect_to(edit_admin_speaker_path(speaker))
        expect(speaker.reload.name).to eq('new name')
      end

      it 'updates the speaker with valid params' do
        patch :update, params: { id: speaker.id, speaker: valid_params }
        expect(speaker.reload.name).to eq('Updated Name')
        expect(response).to have_http_status(:redirect)
      end

      it 'does not update the speaker with invalid params' do
        original_name = speaker.name
        patch :update, params: { id: speaker.id, speaker: invalid_params }
        expect(speaker.reload.name).to eq(original_name)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
