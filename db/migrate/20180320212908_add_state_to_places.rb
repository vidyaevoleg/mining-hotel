class AddStateToPlaces < ActiveRecord::Migration[5.1]
  def change
    add_column :places, :state, :integer, default: 0
  end
end
