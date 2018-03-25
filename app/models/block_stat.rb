class BlockStat < ApplicationRecord
  belongs_to :machine

  def self.unknown_key
    :unknown
  end

end
