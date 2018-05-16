class Stat < ApplicationRecord
  serialize :temperatures, Array
  belongs_to :machine
  scope :active, -> {where(active: true)}
  scope :success, -> {where(active: true)}

  def created_at
    super.in_time_zone("Moscow")
  end
end
