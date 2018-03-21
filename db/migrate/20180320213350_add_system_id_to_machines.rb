class AddSystemIdToMachines < ActiveRecord::Migration[5.1]
  def change
    add_column :machines, :system_id, :integer, index: true
  end
end
