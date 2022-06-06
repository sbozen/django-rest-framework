function addTask(usr, csrf) {
    const todos = document.getElementById('todos').value;
    fetch('/api', {
        method: 'POST',
        headers: {
            "X-CSRFToken": csrf,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'task': todos,
            'completed': false,
        })
    })
        .then(response => response.json())
        .then(result => {
            let table, row;
            document.getElementById('todos').value = '';
            table = document.getElementById('taskTable');
            if (table) {
                row = table.insertRow(-1);
            }
            else {
                table = document.createElement('table');
                table.classList = "table table-striped  ";
                table.setAttribute('id', 'taskTable');
                row = table.insertRow(-1);
                document.getElementById('card').appendChild(table);
            }

            row.className = "justify-content-space";
            var cell0 = document.createElement('td');
            cell0.classList = "d-flex justify-content-end"
            var cell1 = document.createElement('td');
            var cell2 = document.createElement('td');
            var cell3 = document.createElement('td');
            var cell4 = document.createElement('td');
            cell1.innerHTML = result.task;
            cell2.innerHTML = '<button class="btn btn-warning" onclick="editTask(' + result.id + ',\'' + result.task + '\')"><i class="fa fa-pencil text-light" aria-hidden="true"></i></button>';
            cell3.innerHTML = '<button class="btn btn-success mx-3 " onclick="completeTask(' + result.id + ',\'' + result.task + '\')"><i class="fa fa-check" aria-hidden="true"></i></button>';
            cell4.innerHTML = '<button class="btn btn-danger" onclick="deleteTask(' + result.id + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>';
            cell0.append(cell2, cell3, cell4);
            row.append(cell1, cell0);
            console.log("add", result);
            //window.location.reload();
        })
        .catch(error => {
            console.log(error);
        })
}
function deleteTask(id, csrf) {
    fetch('/api/' + id, {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": csrf,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById(id).parentElement.parentElement.remove();
        })
        .catch(error => {
            console.log(error);
        })
}
function completeTask(id, task, csrf) {
    fetch('/api/' + id, {
        method: 'PUT',
        headers: {
            "X-CSRFToken": csrf,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'task': task,
            'completed': true
        })
    })
        .then(response => response.json())
        .then(result => {
            //I'll add effectively solution when the task is completed for show syncrhonization
            var task = document.getElementById(id).parentElement.parentElement;
            task.style = "text-decoration:line-through";
            localStorage.setItem('completedTasks', task.style)
            task.children[1].children[0].disabled = true
        })
        .catch(error => {
            console.log(error);
        })

}
function editTask(id, csrf) {
    var editTask = document.getElementById(id).parentElement.parentElement.children[0];
    editTask.setAttribute('contenteditable', 'true');
    setTimeout(function () {
        editTask.focus();
    }, 0);
    editTask.parentElement.children[1].style.visibility = "hidden";
    editTask.addEventListener('keypress', function (e) {
        if (e.keyCode == 13) {
            editTask.value = editTask.innerText;
            if (editTask != null) {
                fetch('/api/' + id, {
                    method: 'PUT',
                    headers: {
                        "X-CSRFToken": csrf,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'task': editTask.value,
                        'completed': false
                    })
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result);
                        document.getElementById(id).parentElement.parentElement.children[0].innerHTML = result.task;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            editTask.setAttribute('contenteditable', 'false');
            editTask.parentElement.children[1].style.visibility = "visible"
            editTask.parentElement.children[1].children[0].disabled = false
            editTask.parentElement.children[1].children[1].disabled = false
            editTask.parentElement.children[1].children[2].disabled = false
            editTask.parentElement.children[1].children[0].innerHTML = '<i class="fa fa-pencil text-light" aria-hidden="true"></i>'
            editTask.parentElement.children[1].children[1].innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
            editTask.parentElement.children[1].children[2].innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
        }
    })
}

function deleteAll(csrf) {
    fetch('/api', {
        method: 'DELETE',
        headers: {
            "X-CSRFToken": csrf,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById('taskTable').remove();
        }
        )
        .catch(error => {
            console.log(error);
        }
        )
}

