# frozen_string_literal: true

namespace :job_board do
  desc 'Send digest of current posted jobs to Discord'
  task digest: :environment do
    next unless Date.today.monday?

    jobs = Job.last(10)

    message = <<~HEREDOC
       **New jobs on our [job board](https://www.wnb-rb.dev/jobs)**  
       Password: #{ENV.fetch('JOB_BOARD_PASSWORD', nil)}
      #{jobs.map { |job| "• **#{job.title}** at _#{job.company}_" }.join("\n")}
    HEREDOC

    DiscordClient.message(message)
  end
end
