# frozen_string_literal: true
class UninstallPgTrim < ActiveRecord::Migration[7.0]
  def change
    execute 'DROP EXTENSION IF EXISTS pg_trgm;'
  end
end
