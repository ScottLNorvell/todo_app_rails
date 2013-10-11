function newTask() {
	

	params = {
		text: new_task_field.val()
	}

	new_task_field.val('');

	$.ajax({
		method: "POST",
		url: "/create_item",
		data: params,
		success: function(data){
			todo_items.append(data)
		}
	});
}

function completeTask(id) {
	$.ajax({
		method: "POST",
		url: "/complete_item/" + id,
		success: function(data){
			var task = $('#item-' + id);
			//console.log(task);
			task.remove();
			completed_items.append(data);
		}
	});
}

function deleteTask(id) {
	$.ajax({
		method: "DELETE",
		url: "/delete_item/" + id,
		success: function(data){
			var task = $('#item-' + id);
			//console.log(task);

			task.remove();
		}
	});
}

var first_item;
var add_item, new_task_field, todo_items, completed_items;



$(function() {
	add_item = $('#add-item');
	new_task_field = $('#new-task-field');
	todo_items = $('#todo-items');
	completed_items = $('#completed-items');

	add_item.on('click', function(e) {
		// insert into db, get insert into dom
		newTask();
	});

	new_task_field.on('keyup', function(e) {
		if (e.keyCode == 13) {
			// insert into db and dom
			newTask();
		}
	});

	$('.complete').on('click', function() {
		var id = $(this).attr('id').replace('complete-', '')
		
		completeTask(id)
	});

	$('.delete').on('click', function() {
		var id = $(this).attr('id').replace('delete-', '')

		deleteTask(id)
	});



});

















