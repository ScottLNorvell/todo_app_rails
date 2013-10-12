var test_task, complete_task, test_el;
window.timer = {}

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

		due_timer = $('<span>').addClass('due-timer').attr('id', 'due-' + task.id);
		
		due_timer.data({due_date: task.due_date});
		window.timer[task.id] = setInterval(function() { updateTimer(task.id); }, 1000);
		
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
			console.log(data.id);
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
			stopTimer(id);
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
			stopTimer(id);
			task.remove();
		}
	});
}

function updateTimer(id) {
	var task_li = $("#item-" + id);
	var warn_times = [295,290,285];
	var due_timer = $('#due-' + id);
	var now = new Date();
	var due_time = new Date(due_timer.data().due_date);
	var due_seconds = Math.round((due_time - now)/1000)
	due_timer.text("due in " + due_seconds + " seconds")


	if (due_seconds > warn_times[0]) {
		task_li.css({
			backgroundColor: 'rgba(0, 255, 0, 0.2)',
			border: '2px solid rgba(0, 255, 0, 0.3)'
		});
	} else if (due_seconds > warn_times[1]) {
		task_li.css({

			backgroundColor: 'rgba(255, 255, 0, 0.2)',
			border: '2px solid rgba(255, 255, 0, 0.3)'
		});
	} else if (due_seconds > warn_times[2]) {
		task_li.css({
			backgroundColor: 'rgba(255, 165, 0, 0.2)',
			border: '2px dotted rgba(255, 165, 0, 0.3)'
		});
	} else {
		task_li.css({
			backgroundColor: 'rgba(255, 0, 0, 0.2)',
			border: '2px dashed rgba(255, 0, 0, 0.3)'
		});
	}

}

function stopTimer(id) {
	// var due_timer = $('#due-' + id);
	clearInterval(window.timer[id]);
	// due_timer.remove();
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
});

















