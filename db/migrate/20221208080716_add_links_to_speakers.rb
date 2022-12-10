# frozen_string_literal: true
class AddLinksToSpeakers < ActiveRecord::Migration[7.0]
  def change
    add_column :speakers, :links, :jsonb, default: {}
  end
end
