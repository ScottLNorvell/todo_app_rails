class TodoItemsController < ApplicationController
	
	def index 
		@finished_tasks = TodoItem.finished_tasks
		@unfinished_tasks = TodoItem.unfinished_tasks

	end

	def create
		now = Time.now
		@todo_item = TodoItem.create task: params[:text], due_date: 40.minutes.since(now)
		render 'create', layout: false
	end

	def complete
		@todo_item = TodoItem.find params[:id]
		@todo_item.update_attributes completed: Time.now
		render 'create', layout: false
	end

	def destroy
		todo_item = TodoItem.find params[:id]
		todo_item.destroy
		render nothing: true
	end

end
