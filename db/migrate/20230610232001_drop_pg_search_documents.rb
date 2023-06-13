# frozen_string_literal: true
class DropPgSearchDocuments < ActiveRecord::Migration[7.0]
  def change
    say_with_time('Dropping table for pg_search multisearch') do
      drop_table :pg_search_documents
    end
  end
end
