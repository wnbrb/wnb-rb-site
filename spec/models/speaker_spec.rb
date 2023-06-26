# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Speaker, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:event_speakers).dependent(:destroy) }
    it { is_expected.to have_many(:events).through(:event_speakers) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:bio) }
    it { is_expected.to validate_presence_of(:image_url) }
  end
end