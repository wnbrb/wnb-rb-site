# frozen_string_literal: true
require 'net/http'
require 'uri'
require 'json'

namespace :job_board do
  desc 'Send digest of current posted jobs to Discord'
  task digest: :environment do
    # The free Heroku scheduler cannot be set to run on a specific day of the week.
    # If we only want jobs to be posted to Discord on Mondays, we need to specify
    # that here.
    next unless Date.today.monday?

    webhook_url = ENV.fetch('DISCORD_JOBS_WEBHOOK_URL', nil)
    jobs = Job.last(10)
    text = <<~HEREDOC
      Check out the most recent jobs listed on our [job board](https://www.wnb-rb.dev/jobs)! Password: #{ENV.fetch('JOB_BOARD_PASSWORD', nil)}
      #{jobs.map { |job| "\n - #{job.title} at #{job.company}" }.join}
    HEREDOC

    uri = URI.parse(webhook_url)
    Net::HTTP.post(uri, { content: text }.to_json, 'Content-Type' => 'application/json')
  end
end
