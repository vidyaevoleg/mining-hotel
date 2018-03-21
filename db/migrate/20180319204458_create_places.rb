class CreatePlaces < ActiveRecord::Migration[5.1]
  def change
    create_table :places do |t|
      t.string :name
      t.string :url
      t.integer :success_count
      t.integer :error_count
      t.integer :warning_count
      t.timestamps
    end
  end
end
