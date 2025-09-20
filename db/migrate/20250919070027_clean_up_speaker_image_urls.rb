# frozen_string_literal: true
class CleanUpSpeakerImageUrls < ActiveRecord::Migration[7.0]
   def up
    execute <<~SQL
      UPDATE speakers
      SET image_url = TRIM(image_url)
      WHERE image_url IS NOT NULL;
    SQL
  end

end
