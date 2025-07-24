# frozen_string_literal: true

require 'rails_helper'
require 'net/http'
require 'webmock/rspec'
require 'climate_control'

Rails.application.load_tasks

RSpec.describe 'job_board:digest' do
  after(:each) { Rake::Task['job_board:digest'].reenable }

  let(:webhook_url) { 'https://discord.com/api/webhooks/test-webhook' }

  context 'when it is Monday' do
    before { travel_to(Time.now.last_week(:monday)) }
    after { travel_back }

    it 'sends a POST request to the Discord webhook with job listings' do
      job = create(:job)

      request_body = nil
      stub_request(:post, webhook_url).to_return do |request|
        request_body = request.body # Capture the actual request body 
        { status: 200 }
      end

      # Run the rake task
      ClimateControl.modify DISCORD_JOBS_WEBHOOK_URL: webhook_url do
        Rake::Task['job_board:digest'].invoke
      end

      expect(a_request(:post, webhook_url)).to have_been_made.once

      parsed_body = JSON.parse(request_body) # Parse the captured request body
      expect(parsed_body['content']).to include(job.title, job.company) # Assert content
    end
  end

  context 'when it is not Monday' do
    before { travel_to(Time.now.last_week(:tuesday)) }
    after { travel_back }

    it 'does not send a POST request to the Discord webhook' do
      stub = stub_request(:post, webhook_url)

      ClimateControl.modify DISCORD_JOBS_WEBHOOK_URL: webhook_url do
        Rake::Task['job_board:digest'].invoke
      end

      expect(stub).not_to have_been_requested
    end
  end
end
