class CreateMachines < ActiveRecord::Migration[5.1]
  def change
    create_table :machines do |t|
      t.integer :model, default: 0
      t.string :ip
      t.string :place
      t.string :serial
      t.references :stat, index: true
      t.references :place, index: true
      t.timestamps
    end
  end
end
