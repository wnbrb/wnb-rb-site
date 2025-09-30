# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Users::PasswordsController, type: :controller do
  before do
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe 'GET #new' do
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

  describe 'POST #create' do
    let(:user) { create(:user) }

    context 'with valid email' do
      before do
        post :create, params: { user: { email: user.email } }
      end

      it 'redirects to sign in page' do
        expect(response).to redirect_to(new_user_session_path)
      end

      it 'shows success message' do
        expect(flash[:notice]).to be_present
      end
    end

    context 'with invalid email' do
      before do
        post :create, params: { user: { email: 'invalid@example.com' } }
      end

      it 'renders new template' do
        expect(response).to render_template(:new)
      end
    end
  end

  describe 'GET #edit' do
    let(:user) { create(:user) }
    let(:reset_token) { user.send_reset_password_instructions }

    before do
      get :edit, params: { reset_password_token: reset_token }
    end

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the edit template' do
      expect(response).to render_template(:edit)
    end
  end
end
