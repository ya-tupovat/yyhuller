const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let id = 0;



class Todo {
  constructor() {
    this.id = ++id;
    this.check = false;
    this.text = this.getText();
  }
  getText() {
    return prompt('Enter a todo task:')
  }
}



getTodos = function() {
  let todos;

  try {
    todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    
    if (todos.length > 0) {
      id = todos[todos.length - 1].id;
    }
  } catch (error) {
    todos = new Array();
  }

  if (todos === null || Array.isArray(todos) == false) {
    todos = new Array();
  }

  return todos;
}

setTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

pushTodos = function(todo) {
  let todos = getTodos();
  todos.push(todo);
  setTodos(todos);
}



if (getTodos().length != 0) {
  render();
}



function newTodo() {
  const todo = new Todo();
  pushTodos(todo);
  render();
}

function render() {
  list.innerHTML = '';
  getTodos().map(createTodo).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent = getTodos().length;
  uncheckedCountSpan.textContent = getTodos().filter(todo => !todo.check).length;
}

function createTodo(todo) {
  console.log('todo', todo);
  const li = document.createElement('li');

  li.innerHTML = `
  <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check ? "checked" : ""}>
  <button onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `
  return li;
}

function deleteTodo(id) {
  let todos = getTodos();
  setTodos(todos.filter(todo => todo.id !== id));
  render();
}

function changeTodo(id) {
  let todos = getTodos();
  todos = todos.map(todo => todo.id == id ?
    {
    ... todo,
    check: !todo.check
  } : todo);

  setTodos(todos);
  
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
}