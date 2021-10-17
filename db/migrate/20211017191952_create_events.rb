# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :location, default: 'virtual'
      t.text :description
      t.datetime :date
      t.string :type, null: false
      t.text :panel_video_link

      t.timestamps
    end
  end
end
