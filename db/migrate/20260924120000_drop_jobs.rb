# frozen_string_literal: true

class DropJobs < ActiveRecord::Migration[7.1]
  def change
    drop_table :jobs do |t|
      t.string :company
      t.string :title
      t.text :description
      t.string :link
      t.string :location
      t.string :image_url
      t.integer :sponsorship_level

      t.timestamps
    end
  end
end
