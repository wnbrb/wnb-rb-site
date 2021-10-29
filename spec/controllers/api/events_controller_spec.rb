# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::EventsController, type: :controller do
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
end
