class MachinePlaceDecorator < DraperDecorator
  delegate_all

  def user_email
    object.user.email
  end

  def user_url
    "/users/#{object.user.id}"
  end
end
