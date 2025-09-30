# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Admin::DashboardController, type: :controller do
  let(:admin_user) { create(:user, :admin) }

  before do
    sign_in admin_user
  end

  describe 'GET #show' do
    let!(:events) { create_list(:event, 3) }
    let!(:speakers) { create_list(:speaker, 5) }
    let!(:users) { create_list(:user, 10) }

    before { get :show }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the show template' do
      expect(response).to render_template(:show)
    end
  end
end
