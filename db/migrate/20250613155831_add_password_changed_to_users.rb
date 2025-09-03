# frozen_string_literal: true
class AddPasswordChangedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :password_changed, :boolean, default: false
  end
end
