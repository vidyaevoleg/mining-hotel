class UserIndexDecorator < Draper::Decorator

  delegate_all

  def created_at
    super&.strftime("%H:%M %d/%m")
  end

  def last_sign_in_at
    super&.strftime("%H:%M %d/%m")
  end

  def current_sign_in_at
    super&.strftime("%H:%M %d/%m")
  end

end
