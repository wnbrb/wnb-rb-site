# frozen_string_literal: true

namespace :job_board do
  desc 'Send digest of current posted jobs to Slack'
  task digest: :environment do
    slack_client = SlackClient.new
    jobs_channel_id = 'C030WQBRZFH' # TODO: Currently this is #jobs-test, update to the #jobs channel ID
    jobs = Job.last(10)
    text = <<~HEREDOC
      Check out the most recent jobs listed on our [job board](https://www.wnb-rb.dev/jobs)! Password: #{ENV['JOB_BOARD_PASSWORD']}
      #{jobs.map do |job|
        "\n - #{job.title} at #{job.company}"
      end.join}
    HEREDOC

    slack_client.message_channel(recipient_id: jobs_channel_id, text: text)
  end
end
