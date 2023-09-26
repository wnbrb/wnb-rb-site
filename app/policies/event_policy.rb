# frozen_string_literal: true
class EventPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def new?
    user.admin?
  end

  def create?
    user.admin?
  end

  def show?
    user.admin?
  end

  def update?
    user.admin?
  end

  def destroy?
    user.admin?
  end

  def set_talk?
    create?
  end

  def generate_talk?
    create?
  end
end
