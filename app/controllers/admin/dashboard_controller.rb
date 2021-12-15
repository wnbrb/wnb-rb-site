# frozen_string_literal: true

module Admin
  class DashboardController < ApplicationController
  before_action :authenticate_user!

  def show; end
  end
end
