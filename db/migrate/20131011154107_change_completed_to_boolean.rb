class ChangeCompletedToBoolean < ActiveRecord::Migration
  def up
  	remove_column :todo_items, :completed
  	add_column :todo_items, :complete, :boolean
  end

  def down
  	add_column :todo_items, :completed, :datetime
  	remove_column :todo_items, :complete 
  end
end
