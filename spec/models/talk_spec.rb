# frozen_string_literal: true

# == Schema Information
#
# Table name: talks
#
#  id               :bigint           not null, primary key
#  talk_description :text
#  talk_title       :string
#  talk_video_link  :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  event_id         :bigint           not null
#  speaker_id       :bigint           not null
#
# Indexes
#
#  index_talks_on_event_id    (event_id)
#  index_talks_on_speaker_id  (speaker_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (speaker_id => speakers.id)
require 'rails_helper'

RSpec.describe Talk, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:speaker) }
    it { is_expected.to belong_to(:event).optional }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:talk_title) }
    it { is_expected.to validate_presence_of(:talk_description) }
  end

  describe 'scopes' do
    describe 'default_scope' do
      it 'orders talks by id in ascending order' do
        talk1 = create(:talk, id: 2)
        talk2 = create(:talk, id: 1)

        expect(Talk.all).to eq([talk2, talk1])
      end
    end
  end
end
