# frozen_string_literal: true
class ChangeEventSpeakersToTalks < ActiveRecord::Migration[7.0]
  def change
    rename_table('event_speakers', 'talks')
  end
end
