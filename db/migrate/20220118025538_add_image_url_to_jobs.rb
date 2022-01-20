# frozen_string_literal: true
class AddImageUrlToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :image_url, :string
  end
end
