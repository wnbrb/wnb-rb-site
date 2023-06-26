# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventSpeaker, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:speaker) }
    it { is_expected.to belong_to(:event) }
  end
end
