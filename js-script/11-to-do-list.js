let todolist = getTodoList();
showTodo();

function addTodo() {
    const inputElement = document.querySelector(".js-input");
    const inputText = inputElement.value.trim();
    const dateElement = document.querySelector(".js-date");
    let dateValue = dateElement.value;

    if (dateValue === "") {
        dateValue = new Date().toISOString().slice(0, 10);
    }

    if (inputText === "") {
        alert("Invalid Input");
        return;
    }

    todolist.push({ task: inputText, date: dateValue });
    saveTodoList(todolist);

    inputElement.value = "";
    dateElement.value = "";

    showTodo();
}

function showTodo() {
    let todoListElement = document.querySelector(".js-todo-list");
    let htmlList = `
        <table class="todo-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Task</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < todolist.length; i++) {
        htmlList += 
        `<tr>
            <td>${todolist[i].date}</td>
            <td>${todolist[i].task}</td>
            <td style="text-align: center;">
                <button class='btn btn-danger todo-delete-button' onclick='deleteTodo(${i})'>
                    Delete
                </button>
            </td>
        </tr>`;
    }

    htmlList += `
            </tbody>
        </table>
    `;

    todoListElement.innerHTML = htmlList;
}

function handelInputKeyDown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function resetTodoList() {
    todolist = [];
    showTodo();
    saveTodoList(todolist);
}

function saveTodoList(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getTodoList() {
    const savedTodoList = localStorage.getItem('todoList');
    return savedTodoList ? JSON.parse(savedTodoList) : [];
}

function deleteTodo(index) {
    todolist.splice(index, 1);
    showTodo();
    saveTodoList(todolist);
}