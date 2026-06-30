# frozen_string_literal: true

# == Schema Information
#
# Table name: resources
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  url          :string           not null
#  description  :text
#  category     :string           not null
#  submitted_by :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe Resource, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:url) }
    it { is_expected.to validate_presence_of(:category) }
    it { is_expected.to validate_inclusion_of(:category).in_array(Resource::CATEGORIES) }

    describe 'url_format' do
      it 'is valid with an http url' do
        resource = build(:resource, url: 'http://example.com')
        expect(resource).to be_valid
      end

      it 'is valid with an https url' do
        resource = build(:resource, url: 'https://example.com')
        expect(resource).to be_valid
      end

      it 'is invalid with a non-http url' do
        resource = build(:resource, url: 'ftp://example.com')
        expect(resource).to be_invalid
        expect(resource.errors[:url]).to include('is not a valid URL')
      end

      it 'is invalid with malformed url' do
        resource = build(:resource, url: 'not a url')
        expect(resource).to be_invalid
        expect(resource.errors[:url]).to include('is not a valid URL')
      end

      it 'allows blank url (caught by presence validator)' do
        resource = build(:resource, url: '')
        expect(resource).to be_invalid
        expect(resource.errors[:url]).to include("can't be blank")
      end
    end
  end

  describe 'scopes' do
    describe '.by_category' do
      let!(:article) { create(:resource, category: 'article') }
      let!(:book)    { create(:resource, category: 'book') }
      let!(:talk)    { create(:resource, category: 'talk') }

      it 'returns resources matching the given category' do
        expect(Resource.by_category('article')).to contain_exactly(article)
      end

      it 'returns all resources when category is blank' do
        expect(Resource.by_category(nil)).to contain_exactly(article, book, talk)
      end
    end

    describe '.recent' do
      it 'orders resources by created_at descending' do
        older = create(:resource, created_at: 2.days.ago)
        newer = create(:resource, created_at: 1.day.ago)

        expect(Resource.recent).to eq([newer, older])
      end
    end
  end

  describe '#as_json' do
    subject(:resource) { build(:resource) }

    it 'returns a hash with the expected keys' do
      expect(resource.as_json.keys).to match_array(%i[id title url description category submitted_by created_at])
    end
  end
end
