class AddBlocksCountToMachines < ActiveRecord::Migration[5.1]
  def change
    add_column :machines, :blocks_count, :integer, default: 0
  end
end
