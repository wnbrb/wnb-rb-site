# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::EventsController, type: :controller do #rubocop:disable Metrics/BlockLength
  before do
    Meetup.destroy_all
  end

  #rubocop:disable Metrics/BlockLength
  describe 'GET #past' do
    before do
      july_meetup = Meetup.create(title: 'July Meetup', location: 'virtual', date: DateTime.new(2021, 7, 31, 16).utc)
      Meetup.create(title: 'August Meetup', location: 'virtual', date: DateTime.new(2021, 8, 31, 16).utc)
      Panel.create(title: 'Future Panel', location: 'Denver, Colorado', date: DateTime.now + 1.week)

      speaker = Speaker.create(name: 'Speaker Name', tagline: 'Software Developer', bio: 'Lorem Ipsum')
      EventSpeaker.create( event: july_meetup, speaker: speaker, talk_title: 'Some talk title',
talk_description: 'Lorem Ipsum')
    end

    it 'correctly gets past events' do
      get :past
      expect(response).to have_http_status(200)

      body = JSON.parse(response.body)
      expect(body['data']['2021'].count).to eq(2)
    end

    it 'renders events by year and month' do
      get :past
      body = JSON.parse(response.body)
      july_meetup = body['data']['2021']['July'].first
      expect(july_meetup['title']).to eq('July Meetup')

      august_meetup = body['data']['2021']['August'].first
      expect(august_meetup['title']).to eq('August Meetup')
    end

    it 'includes speaker data' do
      get :past
      body = JSON.parse(response.body)

      july_meetup = body['data']['2021']['July'].first
      expect(july_meetup['speakers'].first['name']).to eq('Speaker Name')
    end
  end
  #rubocop:enable Metrics/BlockLength

  describe 'GET #past_by_month' do
    before do
      Meetup.create(title: 'August event', location: 'virtual', date: DateTime.new(2021, 8, 1))
    end

    it 'returns one event for a given month' do
      get :past_by_month, params: {year: '2021', month: '8'}
      expect(response).to have_http_status(200)
      body = JSON.parse(response.body)
      expect(body['data']['title']).to eq('August event')
    end

    it 'returns a 404 when no event exists for that month' do
      get :past_by_month, params: {year: '2021', month: '11'}
      expect(response).to have_http_status(404)
    end
  end
end
