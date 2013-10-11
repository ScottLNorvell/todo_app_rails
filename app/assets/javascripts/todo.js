var test_task, complete_task, test_el;

function renderAndAppendTask(task) {
	// format the d
	var created_date = new Date(task.created_at).toLocaleString();
	var completed_date = new Date(task.updated_at).toLocaleString();
	
	var task_li = $('<li>').addClass('items').attr('id', 'item-' + task.id);
	var task_text = $('<span>').addClass('task-text').text(task.task);
	var meta_data = $('<span>').addClass("meta-data");
	var actions = $('<span>').addClass('actions');
	var delete_button = $('<button>').addClass('delete').text("Delete").attr('id', 'delete-' + task.id);

	delete_button.on('click', function(e) {
		deleteTask(task.id);
	});

	var complete_button, due_timer;
	
	task_li.append(task_text).append(meta_data);

	if (task.complete) {
		meta_data.text(" completed at " + completed_date);
	} else {
		meta_data.text(" created at " + created_date);
		complete_button = $('<button>').addClass('complete').text("Complete").attr('id', 'complete-' + task.id);
		complete_button.on('click', function(e) {
			completeTask(task.id);
		});

		due_timer = $('<span>').addClass('due-timer').attr('id', 'due-' + task.id).text('due at a certain time');
		actions.append(due_timer)
		actions.append(complete_button)
	}

	actions.append(delete_button);
	task_li.append(actions);
	task_li.data({due_date: task.due_date})

	if (task.complete) {
		completed_items.append(task_li);
	} else {
		todo_items.append(task_li);
	}
	test_el = task_li
}

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
			test_task = data;
			renderAndAppendTask(data);
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
			// complete_task = data;
			renderAndAppendTask(data);
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

	$.ajax({
		url: '/tasks',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		$.each(data, function(index, val) {
			renderAndAppendTask(val);
		});
	});
	


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



	// $('.complete').on('click', function() {
	// 	var id = $(this).attr('id').replace('complete-', '')
		
	// 	completeTask(id)
	// });

	// $('.delete').on('click', function() {
	// 	var id = $(this).attr('id').replace('delete-', '')

	// 	deleteTask(id)
	// });



});

















