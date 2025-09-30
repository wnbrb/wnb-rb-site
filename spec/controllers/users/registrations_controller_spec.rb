# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  before do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'GET #new' do
    context 'when not signed in' do
      before { get :new }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'renders the new template' do
        expect(response).to render_template(:new)
      end

      it 'assigns a new user' do
        expect(assigns(:user)).to be_a_new(User)
      end
    end

    context 'when already signed in' do
      let(:user) { create(:user) }

      before do
        sign_in user
        get :new
      end

      it 'redirects to root path' do
        expect(response).to redirect_to(edit_user_registration_path)
      end

      it 'sets appropriate flash message' do
        expect(flash[:alert]).to eq('You are already signed in.')
      end
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) do
      {
        name: 'JohnDoe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        password_changed: true
      }
    end

    context 'with valid parameters' do
      it 'creates a new user' do
        expect do
          post :create, params: { user: valid_attributes }
        end.to change(User, :count).by(1)
      end

      it 'signs in the user' do
        post :create, params: { user: valid_attributes }
        expect(controller.user_signed_in?).to be true
      end

      it 'redirects to root path' do
        post :create, params: { user: valid_attributes }
        expect(response).to redirect_to(edit_user_registration_path)
      end
    end

    context 'with invalid parameters' do
      before do
        post :create, params: { user: { email: 'invalid' } }
      end

      it 'does not create a user' do
        expect(User.count).to eq(0)
      end

      it 'renders new template' do
        expect(response).to render_template(:new)
      end
    end
  end

  describe 'GET #edit' do
    let(:user) { create(:user) }

    before do
      sign_in user
      get :edit
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the edit template' do
      expect(response).to render_template(:edit)
    end
  end

  describe 'PATCH #update' do
    let(:user) { create(:user) }

    before { sign_in user }

    context 'with valid parameters' do
      before do
        patch :update, params: {
          user: {
            name: 'Updated Name',
            current_password: user.password
          }
        }
      end

      it 'updates the user' do
        user.reload
        expect(user.name).to eq('Updated Name')
      end

      it 'redirects to edit page' do
        expect(response).to redirect_to(admin_dashboard_path)
      end
    end

    context 'with invalid current password' do
      before do
        patch :update, params: {
          user: {
            name: 'Updated Name',
            current_password: 'wrong_password'
          }
        }
      end

      it 'does not update the user' do
        user.reload
        expect(user.name).not_to eq('Updated Name')
      end

      it 'renders edit template' do
        expect(response).to render_template(:edit)
      end
    end
  end
end
