class AddBlocksCountToStats < ActiveRecord::Migration[5.1]
  def change
    add_column :stats, :blocks_count, :integer, default: 0
  end
end
