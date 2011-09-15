class ChangePhoneNumberTypeOnCommandsAndVotes < ActiveRecord::Migration
  def change
    
    remove_column :votes, :phone_number
    remove_column :commands, :phone_number
    
    add_column :votes, :phone_number, :string
    add_column :commands, :phone_number, :string
    
  end
end
