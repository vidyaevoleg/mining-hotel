class AddBlackListToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :black_list, :text
  end
end
