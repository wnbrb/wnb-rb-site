# frozen_string_literal: true

class CreateEventSpeakers < ActiveRecord::Migration[6.1]
  def change
    create_table :event_speakers do |t|
      t.string :talk_title
      t.text :talk_description
      t.text :talk_video_link
      t.references :speaker, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
