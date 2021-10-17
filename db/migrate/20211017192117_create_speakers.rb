# frozen_string_literal: true

class CreateSpeakers < ActiveRecord::Migration[6.1]
  def change
    create_table :speakers do |t|
      t.string :name
      t.text :bio
      t.string :tagline

      t.timestamps
    end
  end
end
