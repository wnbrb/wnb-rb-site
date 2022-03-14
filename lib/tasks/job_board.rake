# frozen_string_literal: true

namespace :job_board do
  desc 'Send digest of current posted jobs to Slack'
  task digest: :environment do
    slack_client = SlackClient.new
    jobs_channel_id = ENV['SLACK_JOBS_CHANNEL']
    jobs = Job.last(10)
    text = <<~HEREDOC
      Check out the most recent jobs listed on our <https://www.wnb-rb.dev/jobs|job board>! Password: #{ENV['JOB_BOARD_PASSWORD']}
      #{jobs.map do |job|
        "\n - #{job.title} at #{job.company}"
      end.join}
    HEREDOC

    slack_client.message_channel(recipient_id: jobs_channel_id, text: text)
  end
end
