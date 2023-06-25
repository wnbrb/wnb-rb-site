# frozen_string_literal: true
class AdminController < ApplicationController
  before_action :authenticate_user!

  layout 'admin'
end