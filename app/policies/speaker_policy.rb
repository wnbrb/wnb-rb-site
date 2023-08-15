# frozen_string_literal: true
class SpeakerPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def new?
    user.admin?
  end

  def create?
    user.admin?
  end

  def edit?
    user.admin?
  end

  def show?
    edit?
  end

  def update?
    user.admin?
  end
end
