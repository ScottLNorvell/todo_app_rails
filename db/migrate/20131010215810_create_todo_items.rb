class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.string :task
      t.datetime :completed
      t.datetime :due_date

      t.timestamps
    end
  end
end
