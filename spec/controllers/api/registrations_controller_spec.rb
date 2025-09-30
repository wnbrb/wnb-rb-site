# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Api::RegistrationsController, type: :controller do

  describe 'POST #register_user' do
    let(:valid_params) do
      {
        name: 'Test User',
        email: 'test@example.com'
      }
    end

    context 'when recaptcha is skipped' do
      before do
        allow(controller).to receive(:skip_recaptcha?).and_return(true)
      end

      it 'sends an email without recaptcha validation' do
        expect(DiscordInvitationMailer).to receive(:invite).with(
          valid_params[:name],
          valid_params[:email],
          anything
        ).and_return(double(deliver_now: true))

        post :register_user, params: valid_params, format: :json

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response['success']).to eq('Captcha challenge is correctly solved')
      end
    end

    context 'when recaptcha is required' do
      before do
        allow(controller).to receive(:skip_recaptcha?).and_return(false)
      end

      context 'without recaptcha token' do
        it 'returns not implemented status' do
          post :register_user, params: valid_params, format: :json

          expect(response).to have_http_status(:not_implemented)
          json_response = JSON.parse(response.body)
          expect(json_response['error']).to eq('Recaptcha is disabled')
        end
      end

      context 'with valid recaptcha token' do
        it 'sends email when recaptcha is valid' do
          expect(controller).to receive(:validate_recaptcha).with('valid-token').and_return(true)
          expect(DiscordInvitationMailer).to receive(:invite).with(
            valid_params[:name],
            valid_params[:email],
            anything
          ).and_return(double(deliver_now: true))

          post :register_user, params: valid_params.merge(gtoken: 'valid-token'), format: :json

          expect(response).to have_http_status(:ok)
          json_response = JSON.parse(response.body)
          expect(json_response['success']).to eq('Captcha challenge is correctly solved')
        end
      end

      context 'with invalid recaptcha token' do
        it 'returns error when recaptcha validation fails' do
          expect(controller).to receive(:validate_recaptcha).with('invalid-token').and_return(false)

          post :register_user, params: valid_params.merge(gtoken: 'invalid-token'), format: :json

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response['error']).to eq('Error validating Recaptcha, Please try again later')
        end
      end
    end
  end
end
