# frozen_string_literal: true
require 'rails_helper'

RSpec.describe SiteController, type: :controller do
  describe 'GET #home' do
    before { get :home }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the home template' do
      expect(response).to render_template(:home)
    end
  end

  describe 'GET #join_us' do
    before { get :join_us }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the join_us template' do
      expect(response).to render_template(:join_us)
    end
  end

  describe 'GET #meetups' do
    let!(:upcoming_events) { create_list(:event, 3, :upcoming) }

    before { get :meetups }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the meetups template' do
      expect(response).to render_template(:meetups)
    end
  end

  describe 'GET #past_meetup' do
  before { get :past_meetup, params: { year: '2023', month: '09', day: '15' } }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the past_meetup template' do
      expect(response).to render_template(:past_meetup)
    end
  end

  describe 'GET #sponsor_us' do
    before { get :sponsor_us }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the sponsor_us template' do
      expect(response).to render_template(:sponsor_us)
    end
  end

  describe 'GET #community' do
    before { get :community }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'renders the community template' do
      expect(response).to render_template(:community)
    end
  end
end
