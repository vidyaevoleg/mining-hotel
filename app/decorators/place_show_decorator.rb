class PlaceShowDecorator < Draper::Decorator
  delegate_all

  def machines
    object.machines.map {|m| MachinePlaceDecorator.new(m)}
  end
end
