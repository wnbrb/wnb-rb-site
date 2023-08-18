# frozen_string_literal: true

# == Schema Information
#
# Table name: event_speakers
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
#  index_event_speakers_on_event_id    (event_id)
#  index_event_speakers_on_speaker_id  (speaker_id)
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (speaker_id => speakers.id)
#
class EventSpeaker < ApplicationRecord
  belongs_to :speaker
  belongs_to :event
end
