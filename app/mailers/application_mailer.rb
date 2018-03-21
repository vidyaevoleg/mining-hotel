class ApplicationMailer < ActionMailer::Base
  default from: Settings.mail.from
  layout 'mailer'

  def invite_user(user, token)
    @user, @token = user, token
    mail(to: user.email, subject: 'Добро пожаловать в Miningup Hotel!')
  end
end
