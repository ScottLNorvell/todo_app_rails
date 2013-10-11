class TodoItem < ActiveRecord::Base
  attr_accessible :completed, :due_date, :task

  def self.finished_tasks
  	tasks = self.all 
  	tasks.select { |task| task.completed.present? }
  end

  def self.unfinished_tasks
  	tasks = self.all 
  	tasks.reject { |task| task.completed.present? }
  end


end
