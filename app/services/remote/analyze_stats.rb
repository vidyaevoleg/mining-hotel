class Remote::AnalyzeStats
  attr_reader :machine

  def self.call(*args)
    new(*args).call
  end

  def initialize(machine)
    @machine = machine
  end

  def call
    stats = machine.stats.order(id: :desc).limit(4).to_a.reverse
    last_3_active = !stats.last(3).map(&:active).include?(false)
    last_3_not_active = !last_3_active

    if last_3_not_active && stats.first.active
      # machine turned off
      Notifier.shut_down(machine)
    elsif last_3_active && !stats.first.active
      # machine turned on
      Notifier.turn_on(machine)
    end
  end
end
