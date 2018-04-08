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
      machine = Machine.find_by(place_id: options[:place_id], system_id: options[:id])
      _options = {
        ip: options[:ip],
        serial: options[:serial],
        place: options[:place],
        model: options[:model],
        system_id: options[:id],
        user_id: options[:user_id],
        blocks_count: options[:blocks_count],
        place_id: options[:place_id]
      }
      if machine
        machine.update!(_options)
      else
        machine = Machine.create!(_options)
      end
      machine
    end
  end

  def save_stat
    Remote::SaveStat.call(machine, options)
  end

end
