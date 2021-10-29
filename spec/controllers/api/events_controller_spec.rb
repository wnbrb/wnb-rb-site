# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::EventsController, type: :controller do
  describe 'GET #past_get' do
    it 'correctly renders past events' do
      get :past
      expect(response).to have_http_status(200)

      p JSON.parse(response.body)
    end
  end
end
