# frozen_string_literal: true

class AddSponsorshipLevelToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :sponsorship_level, :integer
  end
end
