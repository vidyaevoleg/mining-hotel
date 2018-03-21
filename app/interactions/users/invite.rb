module Users
  class Invite < ApplicationInteraction
    object :user, class: User

    def execute
      invite_token = user.send(:set_reset_password_token)
      ApplicationMailer.invite_user(user, invite_token).deliver_now
      user.update!(invited: true)
      self
    end
  end
end
