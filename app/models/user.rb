class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  ## TO-DO - add custom validation for email address ???
  validates :name, presence: true
  validates :email, uniqueness: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :authentication_keys => [:email]
end
