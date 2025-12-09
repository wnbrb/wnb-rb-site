# frozen_string_literal: true
require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  controller do
    before_action :authenticate_user!, only: [:protected_action]

    def index
      render plain: 'test'
    end

    def protected_action
      render plain: 'protected'
    end
  end

  describe 'devise configuration' do
    context 'when user signs up' do
      before do
        @request.env['devise.mapping'] = Devise.mappings[:user]
      end

      it 'calls configure_permitted_parameters before devise actions' do
        sanitizer = double('sanitizer')
        user_params = double('user_params')

        allow(controller).to receive(:devise_parameter_sanitizer).and_return(sanitizer)

        expect(sanitizer).to receive(:permit).with(:sign_up).and_yield(user_params)
        expect(sanitizer).to receive(:permit).with(:sign_in).and_yield(user_params)
        expect(sanitizer).to receive(:permit).with(:account_update).and_yield(user_params)

        expect(user_params).to receive(:permit).with(:name, :email, :password, :password_confirmation, :remember_me)
        expect(user_params).to receive(:permit).with(:email, :password, :remember_me)
        expect(user_params).to receive(:permit).with(:name, :email, :password, :password_confirmation,
:current_password)

        controller.send(:configure_permitted_parameters)
      end
    end
  end

  describe '#configure_permitted_parameters' do
    let(:sanitizer) { double('sanitizer') }
    let(:user_params) { double('user_params') }

    before do
      allow(controller).to receive(:devise_parameter_sanitizer).and_return(sanitizer)
    end

    it 'permits correct parameters for sign up, sign in and account update' do

      expect(sanitizer).to receive(:permit).with(:sign_up).and_yield(user_params)
      expect(sanitizer).to receive(:permit).with(:sign_in).and_yield(user_params)
      expect(sanitizer).to receive(:permit).with(:account_update).and_yield(user_params)

      expect(user_params).to receive(:permit).with(:name, :email, :password, :password_confirmation, :remember_me)
      expect(user_params).to receive(:permit).with(:email, :password, :remember_me)
      expect(user_params).to receive(:permit).with(:name, :email, :password, :password_confirmation, :current_password)

      controller.send(:configure_permitted_parameters)
    end
  end

  describe '#validate_recaptcha' do
    let(:token) { 'test_token' }

    context 'when recaptcha is disabled' do
      before do
        allow(ENV).to receive(:fetch).with('RECAPTCHA_ENABLED', false).and_return(false)
      end

      it 'returns false' do
        expect(controller.send(:validate_recaptcha, token)).to be false
      end
    end

    context 'when recaptcha is enabled' do
      before do
        allow(ENV).to receive(:fetch).with('RECAPTCHA_ENABLED', false).and_return(true)
        allow(ENV).to receive(:fetch).with('RECAPTCHA_SECRET_KEY', nil).and_return('secret_key')
      end

      it 'makes request to Google recaptcha API' do

        response = double('response')
        allow(response).to receive(:code).and_return('200')
        allow(response).to receive(:body).and_return('{"success": true, "score": 0.9}')

        allow(Net::HTTP).to receive(:post_form).and_return(response)

        result = controller.send(:validate_recaptcha, token)
        expect(result).to be true
      end

      it 'returns false when score is too low' do
        response = double('response')
        allow(response).to receive(:code).and_return('200')
        allow(response).to receive(:body).and_return('{"success": true, "score": 0.3}')

        allow(Net::HTTP).to receive(:post_form).and_return(response)

        result = controller.send(:validate_recaptcha, token)
        expect(result).to be false
      end
    end
  end

  describe '#after_sign_in_path_for' do
     let(:default_password) { 'adminpassword123%' }

     context 'when user still has default password' do
        let(:user) { double('user') }

        before do
          allow(user).to receive(:valid_password?).with(default_password).and_return(true)
        end

        it 'redirects to edit registration path' do
          expect(controller.send(:after_sign_in_path_for, user)).to eq(edit_user_registration_path)
        end
     end

    context 'when user has a custom password' do
      let(:user) { double('user') }

      before do
        allow(user).to receive(:valid_password?).with(default_password).and_return(false)
      end

      it 'redirects to admin dashboard' do
        expect(controller.send(:after_sign_in_path_for, user)).to eq(admin_dashboard_path)
      end
    end
  end

describe '#render_not_found' do
  controller(ApplicationController) do
    def html_test
      render_not_found
    end

    def json_test
      request.format = :json
      render_not_found
    end

    def other_format_test
      request.format = :xml
      render_not_found
    end
  end

  before do
    routes.draw do
      get 'html_test' => 'anonymous#html_test'
      get 'json_test' => 'anonymous#json_test'
      get 'other_format_test' => 'anonymous#other_format_test'
    end
  end

  it 'renders not found template for HTML requests' do
    get :html_test
    expect(response).to have_http_status(:not_found)
  end

  it 'renders JSON error for JSON requests' do
    get :json_test
    expect(response).to have_http_status(:not_found)
    expect(JSON.parse(response.body)).to eq({ 'error' => 'Not Found' })
  end

  it 'returns not found status for other formats' do
    get :other_format_test
    expect(response).to have_http_status(:not_found)
    expect(response.body).to be_blank
  end
end

  describe 'Pundit authorization' do
    controller do
      def unauthorized_action
        raise Pundit::NotAuthorizedError
      end
    end

    it 'rescues from Pundit::NotAuthorizedError' do
      routes.draw { get 'unauthorized_action' => 'anonymous#unauthorized_action' }

      expect do
        get :unauthorized_action
      end.not_to raise_error

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'authentication' do
    before do
      routes.draw do
        get 'index' => 'anonymous#index'
        get 'protected_action' => 'anonymous#protected_action'
      end
    end

    context 'when accessing public actions' do
      it 'allows access without authentication' do
        get :index
        expect(response).to have_http_status(:success)
        expect(response.body).to eq('test')
      end
    end

    context 'when accessing protected actions' do
      it 'redirects to sign in when not authenticated' do
        get :protected_action
        expect(response).to redirect_to(new_user_session_path)
      end

      it 'allows access when authenticated' do
        user = create(:user)
        sign_in user

        get :protected_action
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'current_user' do
    context 'when user is signed in' do
      let(:user) { create(:user) }

      before { sign_in user }

      it 'returns the current user' do
        get :index
        expect(controller.current_user).to eq(user)
      end
    end

    context 'when user is not signed in' do
      it 'returns nil' do
        get :index
        expect(controller.current_user).to be_nil
      end
    end
  end
end
