class Remote::SaveBlocksStat
  attr_reader :stat, :machine

  def self.call(*args)
    new(*args).call
  end

  def initialize(stat)
    @stat = stat
    @machine = stat.machine
  end

  def call
    if machine.block_stats.any?
      pool = machine.template&.url1 || BlockStat.unknown_key
      known_block_stat = machine.block_stats.find_by(pool: pool)
      last_actual_stat = machine.stats.order(id: :asc).where(success: true).last
      if last_actual_stat.blocks_count < stat.blocks_count
        #we found some new block
        diff = stat.blocks_count - last_actual_stat.blocks_count
        if known_block_stat
          known_block_stat.update(count: known_block_stat.count + diff)
        else
          machine.block_stats.create(pool: pool, count: diff)
        end
      end
    else
      machine.block_stats.create(count: stat.blocks_count, pool: BlockStat.unknown_key)
    end
  end

end
