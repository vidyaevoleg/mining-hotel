class StatSerializer < ApplicationSerializer
  attributes :temps, :id, :hashrate, :time

  def temps
    object.temperatures
  end

  def time
    object.created_at
  end
end
