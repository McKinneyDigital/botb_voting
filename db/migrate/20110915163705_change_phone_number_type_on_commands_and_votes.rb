class ChangePhoneNumberTypeOnCommandsAndVotes < ActiveRecord::Migration
  def change
    
    remove_column :votes, :phone_number
    remove_column :commands, :phone_number
    
    
  end
end
