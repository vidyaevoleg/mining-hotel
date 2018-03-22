class Stat < ApplicationRecord
  serialize :temperatures, Array
  belongs_to :machine

  def created_at
    super.in_time_zone("Moscow")
  end
end
