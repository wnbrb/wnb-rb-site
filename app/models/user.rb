# frozen_string_literal: true
class User < ApplicationRecord
  ADMIN = 'admin'
  ROLES = [ADMIN].freeze

  ## TO-DO - add custom validation for email address ???
  validates :name, presence: true
  validates :email, uniqueness: true
  validates :role, inclusion: { in: ROLES }, allow_nil: true
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         authentication_keys: [:email]

  def admin?
    role == ADMIN
  end
end
