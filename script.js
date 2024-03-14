let todos = [];

// Put dummy data into todos;
// don't use GET and PUT first

let editedToDos = [];

document.addEventListener('DOMContentLoaded', function() {

  main();
  //call the function to load your data with GET or main
  // loadTasks().then(data => {
  //   todos = data;
  //   renderTodos(todos);
  // }).catch(error => {
  //   console.error('Error loading tasks:', error);
  // });
})

function addTodo(todos, name, urgency) {
  console.log("add todo function route hit");
  let newTodo = {
    id: Math.floor(Math.random() * 100 + 1),
    name: name,
    urgency: urgency
  };
  todos.push(newTodo);
  return todos;
}

function main() {
  // store all the todos
  const todoList = document.querySelector("#todoList");

  // event listeners
  const form = document.querySelector("#todo-form");

  form.addEventListener('submit', function(event) {
    console.log("route hit");
    event.preventDefault();

    const taskNameInput = document.querySelector("#taskName")
    const taskName = taskNameInput.value;

    const taskUrgencySelect = document.querySelector("#taskUrgency");
    const taskUrgency = taskUrgencySelect.value;

    if (taskName) {
      addTodo(todos, taskName, taskUrgency);
      renderTodos(todos);
      taskNameInput.value = '';
    }
  });

  // Using event bubbling for the Edit and Delete buttons
  todoList.addEventListener('click', function(event) {
    // Check if the clicked element has the 'edit-btn' class
    if (event.target.classList.contains('edit-btn')) {

      // get the taskId embedded in the button
      const todoId = parseInt(event.target.dataset.taskId);
      console.log("todo Id here in edit", todoId);

      const todo = todos.find(t => t.id === todoId);


      const newName = prompt("Enter the new task name: ", todo.name);
      const newUrgency = prompt("Enter the new urgency:", todo.urgency);

      console.log("todo in edit here", todo);

      // let newEntry = {
      //   id: todo.id,
      //   name: newName,
      //   urgency: newUrgency        
      // }



      modifyTask(todos, todo.id, newName, newUrgency);
      renderTodos(todos);

    }

    // Check if the clicked element has the 'delete-btn' class
    if (event.target.classList.contains('delete-btn')) {
      const todoId = parseInt(event.target.dataset.taskId);
      const todo = todos.find(t => t.id === todoId);

      const toDelete = confirm("Are you sure you want to delete?");
      if (toDelete) {
        deleteTask(todos, todo.id);
        renderTodos(todos);
      }
    }
  });
  // add three todos
  renderTodos(todos);

}

function renderTodos(todos) {
  todoList.innerHTML = '';
  for (let todo of todos) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${todo.name} <span class="badge  bg-primary">${todo.urgency}</span>
       <button data-task-id=${todo.id} class="btn edit-btn btn-success btn-sm">Edit</button>
        <button data-task-id=${todo.id} class="btn delete-btn btn-danger btn-sm">Delete</button>
      `;

    todoList.appendChild(li);
  }
}

document.querySelector("#save-btn").addEventListener("click", () => {
  console.log("new todos here", todos);
  saveTasks(todos);
  console.log("saved")
})
