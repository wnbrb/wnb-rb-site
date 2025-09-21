# frozen_string_literal: true

# == Schema Information
#
# Table name: speakers
#
#  id         :bigint           not null, primary key
#  bio        :text
#  image_url  :string
#  links      :jsonb
#  name       :string
#  tagline    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Speaker, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:talks).dependent(:destroy) }
    it { is_expected.to have_many(:events).through(:talks) }
  end

  describe 'validations' do
    describe '#url_exists?' do
      let(:links_key)   { 'other' }
      let(:raw_url)     { 'example.com' }
      let(:normalized)  { 'https://example.com' }

      context 'when link is blank' do
        it 'is valid and does not hit the network' do
          speaker = build(:speaker, links: { links_key => '' })

          expect(HTTParty).not_to receive(:head)
          expect(HTTParty).not_to receive(:get)

          expect(speaker).to be_valid
        end
      end

      context 'when link has no scheme' do
        it 'normalizes to https:// and validates with HEAD' do
          speaker = build(:speaker, links: { links_key => raw_url })

          expect(HTTParty).to receive(:head)
            .with(normalized, hash_including(:timeout, :follow_redirects, :headers))
            .and_return(double(code: 200))

          expect(speaker).to be_valid
        end
      end

      context 'when server does not allow HEAD (405)' do
        it 'falls back to GET and becomes valid if GET is 200' do
          speaker = build(:speaker, links: { links_key => raw_url })

          expect(HTTParty).to receive(:head)
            .with(normalized, anything)
            .and_return(double(code: 405))

          expect(HTTParty).to receive(:get)
            .with(normalized, anything)
            .and_return(double(code: 200))

          expect(speaker).to be_valid
        end
      end

      context 'when the response is a redirect (3xx)' do
        it 'accepts 301/302/308 as valid' do
          speaker = build(:speaker, links: { links_key => raw_url })

          expect(HTTParty).to receive(:head)
            .with(normalized, anything)
            .and_return(double(code: 301))

          expect(speaker).to be_valid
        end
      end

      context 'when the host is unreachable or times out' do
        it 'is invalid and adds an error' do
          speaker = build(:speaker, links: { links_key => raw_url })

          expect(HTTParty).to receive(:head)
            .with(normalized, anything)
            .and_raise(Net::OpenTimeout)

          expect(speaker).to be_invalid
          expect(speaker.errors[:links])
            .to include("Url not valid: #{links_key} - #{raw_url}")
        end
      end

      context 'when the response is 4xx/5xx' do
        it 'is invalid and adds an error' do
          speaker = build(:speaker, links: { links_key => raw_url })

          expect(HTTParty).to receive(:head)
            .with(normalized, anything)
            .and_return(double(code: 404))

          expect(speaker).to be_invalid
          expect(speaker.errors[:links])
            .to include("Url not valid: #{links_key} - #{raw_url}")
        end
      end
    end
  end

  describe 'scopes' do
    it 'orders speakers by name' do
      speaker_b = create(:speaker, name: 'B Speaker')
      speaker_a = create(:speaker, name: 'A Speaker')
      expect(Speaker.all).to eq([speaker_a, speaker_b])
    end
  end
  context 'when links are not present' do
    it 'validates the social media links' do
      speaker = build(:speaker)
      speaker1 = build(:speaker, :with_empty_links)

      expect(speaker).to be_valid
      expect(speaker1).to be_valid
    end
  end

  context 'when links are present' do
    describe 'with valid links' do
      before do
        allow(HTTParty).to receive(:head).and_return(double(code: 200))
        allow(HTTParty).to receive(:get).and_return(double(code: 200))
      end

      it 'validates the social media links' do
        speaker = build(:speaker, :with_valid_links)
        expect(speaker).to be_valid
      end
    end

    describe 'with invalid links' do
      it 'validates the social media links' do
        speaker = build(:speaker, :with_invalid_links)

        expect(speaker).to be_invalid
        expect(speaker.errors[:links]).to include('This social media is not allowed')
      end
    end
  end

  describe 'callbacks' do
    describe '#format_links' do
      let(:links) { { 'Twitter' => 'link_twitter', 'LinkedIn' => 'link_linkedIn' } }

      it 'downcases the keys of the links' do
        speaker = build(:speaker, links: links)

        speaker.valid?
        expect(speaker.links).to eq({ 'twitter' => 'link_twitter', 'linkedin' => 'link_linkedIn' })
      end
    end

    describe 'strip_image_url' do
      it 'removes leading and trailing whitespace' do
        speaker = build(:speaker, image_url: '  http://example.com/image.png  ')
        speaker.valid? # triggers before_validation
        expect(speaker.image_url).to eq('http://example.com/image.png')
      end

      it 'leaves nil image_url untouched' do
        speaker = build(:speaker, image_url: nil)
        speaker.valid?
        expect(speaker.image_url).to be_nil
      end
    end
   end
end
