class Ability
  include CanCan::Ability

  def initialize(user)
      user ||= User.new # guest user (not logged in)
      can :read, :all
      can :manage, :all # for testing
      if user.admin?
        can :manage, :all
      end
  end
end
