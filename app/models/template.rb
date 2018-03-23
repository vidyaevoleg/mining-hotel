class Template < ApplicationRecord
  belongs_to :machine, optional: true
  belongs_to :user, optional: true
  validates_presence_of :url1, :worker1, :password1

  def to_params
    fields = [:url1, :url2, :url3, :worker1, :worker2,
      :worker3, :password1, :password2, :password3,
      :fan, :fan_value, :freq]
    answer = {}
    fields.each do |field|
      answer[field] = public_send(field)
    end
    answer
  end
end
