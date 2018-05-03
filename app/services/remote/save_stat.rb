class Remote::SaveStat
  attr_reader :options, :machine, :new_stat

  def self.call(*args)
    new(*args).call
  end

  def initialize(machine, options={})
    @machine = machine
    @options = options
  end

  def call
    save_stat
    save_blocks
    analyze_stats
  end

  private

  def save_stat
    @new_stat = machine.stats.create!(
      temperatures: options[:temparatures]&.map(&:to_i) || [],
      active: options[:active],
      success: options[:success],
      hashrate: options[:hashrate],
      blocks_count: options[:blocks_count]
    )
    machine.update(stat_id: new_stat.id)
  end

  def analyze_stats
    AnalyzerJob.perform_later(machine.id)
  end

  def save_blocks
    Remote::SaveBlocksStat.call(new_stat)
  end
end
