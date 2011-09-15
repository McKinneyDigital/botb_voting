class AddNewPhoneNumber < ActiveRecord::Migration
  def change
    add_column :votes, :phone_number, :string
    add_column :commands, :phone_number, :string
  end
end
