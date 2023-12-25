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
    context 'when the talk is not associated with a panel event' do
      before { allow(subject).to receive(:panel_event?).and_return(false) }

      it { is_expected.to validate_presence_of(:talk_title) }
      it { is_expected.to validate_presence_of(:talk_description) }
    end

    context 'when the talk is associated with a panel event' do
      before { allow(subject).to receive(:panel_event?).and_return(true) }

      it { is_expected.not_to validate_presence_of(:talk_title) }
      it { is_expected.not_to validate_presence_of(:talk_description) }
    end

    context 'when the talk video link is present' do
      it 'validates the format of the talk video link' do
        talk = build(:talk, talk_video_link: 'https://www.youtube.com/embed/VIDEO_CODE')
        expect(talk).to be_valid

        talk.talk_video_link = 'invalid_link'
        expect(talk).to be_invalid
        expect(talk.errors[:talk_video_link]).to include(', please provide a YouTube link in the following format: https://www.youtube.com/embed/VIDEO_ID')
      end
    end
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
