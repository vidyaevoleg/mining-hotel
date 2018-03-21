class Remote::SaveMachine
  attr_reader :options, :machine

  def self.call(*args)
    new(*args).call
  end

  def initialize(options)
    @options = options.with_indifferent_access
  end

  def call
    find_or_create
    save_stat
    machine
  end

  private

  def find_or_create
    @machine ||= begin
      machine = Machine.find_by(system_id: options[:id])
      _options = {
        place: options[:place],
        ip: options[:ip],
        serial: options[:serial],
        model: options[:model],
        system_id: options[:id],
        user_id: options[:user_id],
        blocks_count: options[:blocks_count],
        place_id: options[:place_id]
      }
      if machine
        machine.update!(_options)
      else
        machine = Machine.create(_options)
      end
      machine
    end
  end

  def save_stat
    new_stat = machine.stats.create(
      temperatures: options[:temparatures],
      active: options[:active],
      success: options[:success],
      hashrate: options[:hashrate]
    )
    machine.update(stat_id: new_stat.id)
  end
end
