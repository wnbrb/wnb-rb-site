# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::DonationsController, type: :controller do
  describe 'POST #create' do
    it 'calls create on a stripe checkout session' do
      expect(Stripe::Checkout::Session).to receive(:create).and_return(double(url: 'http://example.com'))
      post :create, params: { donation: { price: 10 } }
    end
  end
end