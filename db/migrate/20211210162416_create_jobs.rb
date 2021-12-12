# frozen_string_literal: true
class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :company
      t.string :title
      t.text :description
      t.string :link
      t.string :location

      t.timestamps
    end
  end
end
