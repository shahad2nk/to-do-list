//selectors
const todoBtn = document.querySelector(".add");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const filterOption = document.querySelector(".filter");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterList);

// functions

function addTodo(event) {
  if (todoInput.value === " ") {
    event.preventDefault();
    alert("WRITE SOMETHING U STUPID!");
  } else {
    //prevent update
    event.preventDefault();

    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //add todo
    const task = document.createElement("li");
    task.classList.add("task");
    task.innerText = todoInput.value;
    todoDiv.appendChild(task);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //check btn
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn);

    //trash btn
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);

    //append todo to ul
    todoList.appendChild(todoDiv);

    //clear input
    todoInput.value = " ";
  }
}

//delete and check
function deleteCheck(e) {
  const item = e.target;

  // delete
  if (item.classList[0] === "trash") {
    const todo = item.parentElement;
    //animation
    removeTodos(todo);
    todo.classList.add("fall");
    //transition end, remove the elements
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // completed
  if (item.classList[0] === "check") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filter list
function filterList(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// //save list
function saveLocalTodos(todo) {
  //check if I have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// //get list
function getTodos(todo) {
  //check if I have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //add todo
    const task = document.createElement("li");
    task.classList.add("task");
    task.innerText = todo;
    todoDiv.appendChild(task);

    //check btn
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn);

    //trash btn
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashBtn);

    //append todo to ul
    todoList.appendChild(todoDiv);
  });
}

//remove todos
function removeTodos(todo){
     //check if I have anything in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1)

localStorage.setItem('todos', JSON.stringify(todos));

}