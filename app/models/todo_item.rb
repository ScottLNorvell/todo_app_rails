class TodoItem < ActiveRecord::Base
  attr_accessible :complete, :due_date, :task

  def self.finished_tasks
  	tasks = self.all 
  	tasks.select { |task| task.complete }
  end

  def self.unfinished_tasks
  	tasks = self.all 
  	tasks.reject { |task| task.complete }
  end


end
