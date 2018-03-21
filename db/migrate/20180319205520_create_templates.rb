class CreateTemplates < ActiveRecord::Migration[5.1]
  def change
    create_table :templates do |t|
      t.string :url1
      t.string :worker1
      t.string :password1
      t.string :url2
      t.string :worker2
      t.string :password2
      t.string :url3
      t.string :worker3
      t.string :password3
      t.boolean :fan, default: false
      t.integer :fan_value, default: 100
      t.integer :freq, default: 400
      t.references :machine, index: true
      t.references :user, index: true
    end
  end
end
