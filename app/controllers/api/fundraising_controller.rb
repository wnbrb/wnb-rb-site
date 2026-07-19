# frozen_string_literal: true

module Api
  class FundraisingController < ApplicationController
    def show
      progress = GivebutterService.new.campaign_progress

      if progress.nil?
        render status: 503, json: {}
      else
        render status: 200, json: { data: progress }
      end
    end
  end
end
