class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :phone_number
      t.references :band
      t.timestamps
    end
  end
end
