class CreateCommands < ActiveRecord::Migration
  def change
    create_table :commands do |t|
      t.string :instruction
      t.integer :phone_number
      t.timestamps
    end
  end
end
