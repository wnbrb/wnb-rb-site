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

    let(:json_response) { JSON.parse(response.body) }

    before do
      allow(ENV).to receive(:fetch).and_call_original
      allow(ENV).to receive(:fetch).with('DISCORD_INVITE_URL', nil).and_return('https://discord.gg/example')
    end

    context 'when recaptcha is skipped' do
      before do
        allow(controller).to receive(:skip_recaptcha?).and_return(true)
      end

      it 'sends an email without recaptcha validation' do
        expect(DiscordInvitationMailer).to receive(:invite).with(
          valid_params[:name],
          valid_params[:email],
          'https://discord.gg/example'
        ).and_return(double(deliver_now: true))

        post :register_user, params: valid_params, format: :json

        expect(response).to have_http_status(:ok)
        expect(json_response['success']).to include('Test User', 'test@example.com')
      end

      it 'strips surrounding whitespace from the name and email' do
        expect(DiscordInvitationMailer).to receive(:invite).with(
          'Test User',
          'test@example.com',
          anything
        ).and_return(double(deliver_now: true))

        post :register_user, params: { name: '  Test User  ', email: ' test@example.com ' }, format: :json

        expect(response).to have_http_status(:ok)
      end

      context 'with missing details' do
        it 'returns an error when the name is blank' do
          expect(DiscordInvitationMailer).not_to receive(:invite)

          post :register_user, params: valid_params.merge(name: '  '), format: :json

          expect(response).to have_http_status(:unprocessable_content)
          expect(json_response['error']).to eq('Please tell us your name and email address.')
        end

        it 'returns an error when the email is blank' do
          expect(DiscordInvitationMailer).not_to receive(:invite)

          post :register_user, params: valid_params.merge(email: ''), format: :json

          expect(response).to have_http_status(:unprocessable_content)
          expect(json_response['error']).to eq('Please tell us your name and email address.')
        end

        it 'returns an error when the email is malformed' do
          expect(DiscordInvitationMailer).not_to receive(:invite)

          post :register_user, params: valid_params.merge(email: 'not-an-email'), format: :json

          expect(response).to have_http_status(:unprocessable_content)
          expect(json_response['error']).to eq('Please enter a valid email address.')
        end
      end

      context 'when the invite URL is not configured' do
        it 'returns a delivery error instead of sending a blank invite' do
          allow(ENV).to receive(:fetch).with('DISCORD_INVITE_URL', nil).and_return(nil)
          expect(DiscordInvitationMailer).not_to receive(:invite)

          post :register_user, params: valid_params, format: :json

          expect(response).to have_http_status(:internal_server_error)
          expect(json_response['error']).to eq(described_class::GENERIC_DELIVERY_ERROR)
        end
      end

      context 'when delivery fails' do
        it 'reports the failure to the user rather than claiming success' do
          allow(DiscordInvitationMailer).to receive(:invite)
            .and_raise(Resend::Error.new('Domain is not verified', 422))

          post :register_user, params: valid_params, format: :json

          expect(response).to have_http_status(:internal_server_error)
          expect(json_response['error']).to eq(described_class::GENERIC_DELIVERY_ERROR)
        end

        it 'logs the underlying error' do
          allow(DiscordInvitationMailer).to receive(:invite).and_raise(StandardError, 'boom')
          expect(controller.logger).to receive(:error).with(/Failed to deliver Discord invitation/)

          post :register_user, params: valid_params, format: :json

          expect(response).to have_http_status(:internal_server_error)
        end
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
          expect(json_response['success']).to include('Test User')
        end
      end

      context 'with invalid recaptcha token' do
        it 'returns error when recaptcha validation fails' do
          expect(controller).to receive(:validate_recaptcha).with('invalid-token').and_return(false)

          post :register_user, params: valid_params.merge(gtoken: 'invalid-token'), format: :json

          expect(response).to have_http_status(:unprocessable_content)
          expect(json_response['error']).to include("couldn't verify that you're a human")
        end
      end
    end
  end
end
