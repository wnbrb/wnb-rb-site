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
#
class Talk < ApplicationRecord
  belongs_to :speaker
  belongs_to :event, optional: true

  validates :talk_title, :talk_description, presence: true, unless: :panel_event?
  validate :validate_video_link, if: ->(t) { t.talk_video_link.present? }

  default_scope { order(id: :asc) }

  def validate_video_link
    return unless talk_video_link.present? && !talk_video_link.include?('/embed')
    errors.add(:talk_video_link, ', please provide a YouTube link in the following format: https://www.youtube.com/embed/VIDEO_ID')
  end

  def panel_event?
    event.is_a?(Panel)
  end
end
