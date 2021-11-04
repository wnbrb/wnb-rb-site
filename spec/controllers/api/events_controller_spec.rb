# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::EventsController, type: :controller do #rubocop:disable Metrics/BlockLength
  before do
    Meetup.destroy_all
  end
  
  describe 'GET #past' do
    before do
      Meetup.create(title: 'Fake title', location: 'virtual', date: DateTime.now - 1.day)
      Meetup.create(title: 'Fake title 2', location: 'virtual', date: DateTime.now - 2.weeks)
      Panel.create(title: 'Fake title 3', location: 'Denver, Colorado', date: DateTime.now + 1.week)
    end

    it 'correctly renders past events' do
      get :past
      expect(response).to have_http_status(200)

      body = JSON.parse(response.body)

      expect(body['data'].count).to eq(2)
      expect(body['data'].map { |item| item['title'] }).to eq(['Fake title', 'Fake title 2'])
    end

  end

  describe 'GET #past_by_month' do
    before do
      Meetup.create(title: 'August event', location: 'virtual', date: DateTime.new(2021, 8, 1))
    end
    
    it 'correctly renders events for a given month' do
      get :past_by_month, params: {year: '2021', month: '8'}
      expect(response).to have_http_status(200)
      body = JSON.parse(response.body)
      expect(body['data'].map{ |item| item['title'] }).to eq(['August event'])
    end

    it 'returns a 404 when no events exist for that month' do
      get :past_by_month, params: {year: '2021', month: '11'}
      expect(response).to have_http_status(404)
    end
  end
end
