const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "65c85ecddc74654018a32eb5";
const MASTER_KEY = '$2a$10$xH01egZdgtiA.drn6RNEJ.Rwxo.GR/voBOJtGLDPpI1nOfnB91Bwa';

// let todos = [];


function modifyTask(todos, id, newTaskName, newUrgency) {
  let task = null; // temporary placeholder for your new object with updated data
  let foundIndex; // this is where we find the index of the object we need to change, it will be found when we loop

  for (let t of todos) {
    if (t.id == id) {
      task = t;
      foundIndex = todos.indexOf(t);
      console.log("found index here", foundIndex);
    }
  }

  if (task) {
    task.name = newTaskName;
    task.urgency = newUrgency;
    console.log("task is here", task);
  } else {
    console.log("Task is not found");
  }

  let cloneArray = todos;
  let left = cloneArray.slice(0, foundIndex); //returns a clone array that is sliced from index 0 to before the foundIndex
  let right = cloneArray.slice(foundIndex + 1); // returns a clone array sliced one position after your foundIndex where u want to change
  let modifiedTaskList = [...left, task, ...right];
  console.log("modified task list", modifiedTaskList);

  todos = modifiedTaskList;

}

function deleteTask(todos, id) {
  let indexToDelete = null;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    todos.splice(indexToDelete, 1);
  } else {
    console.log("Task is not found");
  }
}

// ...add at the end of `data.js`
// async function loadTasks() {
//   const response = await axios.get("https://api.jsonbin.io/v3/b" + "/" + "65c85ecddc74654018a32eb5" + "/latest");
//   return response.data.record;
// }

async function loadTasks() {
  const response = await axios.get("https://api.jsonbin.io/v3/b" + "/" + "65c85ecddc74654018a32eb5");
  return response.data.record;
}

async function saveTasks(todos) {
  try {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, todos, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": MASTER_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}
