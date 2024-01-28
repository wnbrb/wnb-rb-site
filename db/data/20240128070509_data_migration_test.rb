# frozen_string_literal: true

class DataMigrationTest < ActiveRecord::Migration[7.0]
  def up
    p 'This is an example for data migration'
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
