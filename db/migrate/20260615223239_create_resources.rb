# frozen_string_literal: true

class CreateResources < ActiveRecord::Migration[7.1]
  def change
    create_table :resources do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.text :description
      t.string :category, null: false
      t.string :submitted_by

      t.timestamps
    end
  end
end
