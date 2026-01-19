# frozen_string_literal: true
class AddImagePathToSpeakers < ActiveRecord::Migration[7.1]
  def change
    add_column :speakers, :image_path, :string
  end
end
