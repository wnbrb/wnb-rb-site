# frozen_string_literal: true

require 'rails_helper'

Rails.application.load_tasks

RSpec.describe 'job_board:digest' do
  after(:each) { Rake::Task['job_board:digest'].reenable }

  context 'when it is Monday' do
    # April 11, 2022 was a Monday
    before { Timecop.travel(Time.new(2022, 4, 11)) }
    after { Timecop.return }

    it 'posts job listings to Slack' do
      client = stub_slack_client
      job = create(:job)
      Rake::Task['job_board:digest'].invoke

      expect(client).to have_received(:message_channel).with(
        hash_including(text: /- #{job.title} at #{job.company}/),
      )
    end
  end

  context 'when it is not Monday' do
    # April 12, 2022 was a Tuesday
    before { Timecop.travel(Time.new(2022, 4, 12)) }
    after { Timecop.return }

    it 'does not post job listings to Slack' do
      client = stub_slack_client
      Rake::Task['job_board:digest'].invoke

      expect(client).not_to have_received(:message_channel)
    end
  end

  def stub_slack_client
    client = instance_double(SlackClient, message_channel: nil)
    allow(SlackClient).to receive(:new).and_return(client)
    client
  end
end
