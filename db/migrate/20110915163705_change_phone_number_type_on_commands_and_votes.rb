class ChangePhoneNumberTypeOnCommandsAndVotes < ActiveRecord::Migration
  def up
    
    remove_column :votes, :phone_number
    remove_column :commands, :phone_number
    
    add_column :votes, :phone_number, :string
    add_column :commands, :phone_number, :string
    
  end

  def down
    
    remove_column :votes, :phone_number
    remove_column :commands, :phone_number
    
    add_column :votes, :phone_number, :integer
    add_column :commands, :phone_number, :integer
    
  end
end
