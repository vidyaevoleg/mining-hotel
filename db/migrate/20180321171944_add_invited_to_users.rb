class AddInvitedToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :invited, :boolean, default: false
  end
end
