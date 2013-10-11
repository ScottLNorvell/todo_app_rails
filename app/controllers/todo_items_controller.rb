class TodoItemsController < ApplicationController
	
	def index 
		# @finished_tasks = TodoItem.finished_tasks
		# @unfinished_tasks = TodoItem.unfinished_tasks
	end

	def tasks
		todo_items = TodoItem.all
		render json: todo_items
	end

	def create
		now = Time.now
		@todo_item = TodoItem.create task: params[:text], due_date: 40.minutes.since(now)
		# render 'create', layout: false
		render json: @todo_item
	end

	def complete
		@todo_item = TodoItem.find params[:id]
		@todo_item.update_attributes complete: true
		# render 'create', layout: false
		render json: @todo_item
	end

	def destroy
		todo_item = TodoItem.find params[:id]
		todo_item.destroy
		render nothing: true
	end

end
