# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id               :bigint           not null, primary key
#  date             :datetime
#  description      :text
#  location         :string           default("virtual")
#  panel_video_link :text
#  title            :string
#  type             :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
require 'rails_helper'

RSpec.describe Event, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:talks).dependent(:destroy) }
    it { is_expected.to have_many(:speakers).through(:talks) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:location) }
    it { is_expected.to validate_presence_of(:date) }
    it { is_expected.to accept_nested_attributes_for(:talks).allow_destroy(true) }
  end
end
