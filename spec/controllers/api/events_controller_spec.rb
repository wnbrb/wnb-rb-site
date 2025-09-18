# frozen_string_literal: true

require './spec/rails_helper'

RSpec.describe Api::EventsController, type: :controller do
  before do
    Meetup.destroy_all

    # Some of these tests may be time-dependent
    # so we mock the time the tests are run
    travel_to(DateTime.new(2022, 3, 30))
  end

  after { travel_back }

  describe 'GET #past' do
    before do
      july_meetup = create(:event, title: 'July Meetup', date: DateTime.new(2021, 7, 31, 16).utc)
      create(:event, title: 'August Meetup', date: DateTime.new(2021, 8, 31, 16).utc)
      Panel.create(title: 'Future Panel', location: 'Denver, Colorado', date: DateTime.now + 1.week)

      speaker =
        create(
          :speaker,
          :stub_http_ok,
          name: 'Speaker Name',
          links: {
            twitter: 'http://example.com/twitter-link',
            mastodon: 'http://example.com/mastodon-link',
            website: 'http://example.com/personal-website-link',
          },

        )
      Talk.create(
        event: july_meetup,
        speaker: speaker,
        talk_title: 'Some talk title',
        talk_description: 'Lorem Ipsum',
      )
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
      expect(july_meetup['speakers'].first['links']).to eq(
        {
          'twitter' => 'http://example.com/twitter-link',
          'mastodon' => 'http://example.com/mastodon-link',
          'website' => 'http://example.com/personal-website-link',
        },
      )
    end

    it 'includes talk titles' do
      get :past
      body = JSON.parse(response.body)

      july_meetup = body['data']['2021']['July'].first
      expect(july_meetup['talks'].first['talk_title']).to eq('Some talk title')
    end
  end

  describe 'GET #past_by_month_day' do
    before do
      Meetup.create(title: 'August event', location: 'virtual', date: DateTime.new(2021, 8, 1))
    end

    it 'returns one event for a given month' do
      get :past_by_month_day, params: { year: '2021', month: '8', day: 1 }
      expect(response).to have_http_status(200)
      body = JSON.parse(response.body)
      expect(body['data']['title']).to eq('August event')
    end

    it 'returns a 404 when no event exists for that month' do
      get :past_by_month_day, params: { year: '2021', month: '11', day: 1 }
      expect(response).to have_http_status(404)
    end
  end

  describe 'GET #upcoming' do
    before do
      august_meetup =
        create(:event, title: 'August Meetup', date: DateTime.new(2022, 8, 31, 16).utc)
      create(:event, title: 'September Meetup', date: DateTime.new(2022, 9, 25, 16).utc)
      Panel.create(title: 'Future Panel', location: 'Denver, Colorado', date: DateTime.now - 1.week)

      speaker = create(:speaker, name: 'Speaker Name')
      Talk.create(
        event: august_meetup,
        speaker: speaker,
        talk_title: 'Some talk title',
        talk_description: 'Lorem Ipsum',
      )
    end

    it 'correctly gets upcoming events' do
      get :upcoming
      expect(response).to have_http_status(200)

      body = JSON.parse(response.body)
      expect(body['data']['2022'].count).to eq(2)
    end

    it 'renders events by year and month' do
      get :upcoming
      body = JSON.parse(response.body)
      august_meetup = body['data']['2022']['August'].first
      expect(august_meetup['title']).to eq('August Meetup')

      september_meetup = body['data']['2022']['September'].first
      expect(september_meetup['title']).to eq('September Meetup')
    end

    it 'includes speaker data' do
      get :upcoming
      body = JSON.parse(response.body)

      august_meetup = body['data']['2022']['August'].first
      expect(august_meetup['speakers'].first['name']).to eq('Speaker Name')
      expect(august_meetup['speakers'].first['links']).to eq({})
    end
  end
end
