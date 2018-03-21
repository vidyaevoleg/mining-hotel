class Stat < ApplicationRecord
  serialize :temparatures, Array
  belongs_to :machine

  def created_at
    super.in_time_zone("Moscow")
  end
end
