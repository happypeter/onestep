class Ability
  include CanCan::Ability

  def initialize(user)
      user ||= User.new # guest user (not logged in)
      can :manage, :all # cancan not in use now
      if user.admin?
        can :manage, :all
      end
  end
end
