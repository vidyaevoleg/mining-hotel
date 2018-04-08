class Remote::AnalyzeStats
  attr_reader :machine

  def self.call(*args)
    new(*args).call
  end

  def initialize(machine)
    @machine = machine
  end

  def call
    stats = machine.stats.order(id: :desc).limit(6).to_a.reverse
    last_5_active = !stats.last(5).map(&:active).include?(false)
    last_5_not_active = !last_5_active

    if last_5_not_active && stats.first.active
      # machine turned off
      Notifier.shut_down(machine)
    elsif last_5_active && !stats.first.active
      # machine turned on
      Notifier.turn_on(machine)
    end
  end
end
