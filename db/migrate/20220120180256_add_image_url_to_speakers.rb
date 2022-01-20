# frozen_string_literal: true
class AddImageUrlToSpeakers < ActiveRecord::Migration[7.0]
  def change
    add_column :speakers, :image_url, :string
  end
end
