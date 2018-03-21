class TemplateSerializer < ApplicationSerializer
  attributes :id, :name, :url1, :url2, :url3,
    :worker1, :worker2, :worker3,
    :password1, :password2, :password3,
    :fan, :fan_value, :freq
end
