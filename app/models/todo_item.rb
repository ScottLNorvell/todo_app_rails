class TodoItem < ActiveRecord::Base
  attr_accessible :completed, :due_date, :task
end
