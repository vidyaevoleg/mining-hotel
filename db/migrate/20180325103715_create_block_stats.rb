class CreateBlockStats < ActiveRecord::Migration[5.1]
  def change
    create_table :block_stats do |t|
      t.string :pool
      t.integer :count, default: 0
      t.references :machine, index: true
    end
  end
end
