# frozen_string_literal: true

require 'rails_helper'

Rails.application.load_tasks

RSpec.describe 'job_board:digest' do

   around do |example|
    ClimateControl.modify(DISCORD_WEBHOOK_URL: 'https://example.com/webhook') do
      example.run
    end
  end

  after(:each) { Rake::Task['job_board:digest'].reenable }


  context 'when it is Monday' do
    before { travel_to(Time.now.last_week(:monday)) }
    after { travel_back }

    it 'posts job listings to Discord' do
      client = stub_discord_client
      job = create(:job)
      Rake::Task['job_board:digest'].invoke

      expect(client).to have_received(:message).with(
        a_string_including("**#{job.title}** at _#{job.company}_")
      )
    end
  end

  context 'when it is not Monday' do
    before { travel_to(Time.now.last_week(:tuesday)) }
    after { travel_back }

    it 'does not post job listings to Discord' do
      client = stub_discord_client
      Rake::Task['job_board:digest'].invoke

      expect(client).not_to have_received(:message)
    end
  end

  def stub_discord_client
    client = class_double(DiscordClient, message: nil).as_stubbed_const
    client
  end
end
