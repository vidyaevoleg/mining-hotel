class AddUserIdToMachines < ActiveRecord::Migration[5.1]
  def change
    add_column :machines, :user_id, :integer, index: true
  end
end
