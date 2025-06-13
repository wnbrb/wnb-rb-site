# frozen_string_literal: true
require 'rails_helper'
require 'rake'

RSpec.describe 'user:add_user' do

context 'admin setup via rake' do
  before(:all) do
    Rake.application.rake_require('tasks/user')
    Rake::Task.define_task(:environment)
  end

  it 'runs the rake task to add a user' do

    expect do
      Rake::Task['user:add_user'].reenable
      Rake::Task['user:add_user'].invoke('Admin', 'test@example.com', 'changeme')
      end.to change(User, :count).by(1)

    end
  end
end
