# frozen_string_literal: true
require 'rails_helper'

RSpec.describe AdminController, type: :controller do
  let(:admin_user) { create(:user, :admin) }
  let(:regular_user) { create(:user) }

  controller do
    def test_access
      render plain: 'Access granted'
    end

    def test_edit
      authorize :anything, :edit?
      render plain: 'Edit granted'
    end
  end

  before do
    routes.draw do
      get 'test_access', to: 'admin#test_access'
      get 'test_edit', to: 'admin#test_edit'
    end
  end

  describe 'authentication' do
    context 'when user is not signed in' do
      it 'redirects to sign in page' do
        get :test_access
        expect(response).to redirect_to(new_user_session_path)
      end
    end

    context 'when regular user is signed in' do
      before do
        sign_in regular_user
      end

      it 'allows access to view pages' do
        get :test_access
        expect(response).to have_http_status(:success)
        expect(response.body).to eq('Access granted')
      end

      it 'forbids access to edit operations' do
        expect(controller).to receive(:authorize).and_raise(Pundit::NotAuthorizedError)

        get :test_edit
        expect(response).to have_http_status(:unauthorized)
        expect(flash[:alert]).to eq('You are not allowed to perform this action')
      end
    end

    context 'when admin user is signed in' do
      before do
        sign_in admin_user
      end

      it 'allows access to view pages' do
        get :test_access
        expect(response).to have_http_status(:success)
      end

      it 'allows access to edit operations' do
        expect(controller).to receive(:authorize).and_return(true)

        get :test_edit
        expect(response).to have_http_status(:success)
        expect(response.body).to eq('Edit granted')
      end
    end
  end
end
