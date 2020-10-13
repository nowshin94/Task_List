//define UI element

let form = document.querySelector('#task_form');
let taskList = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clear_task-btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

//define event listener

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

//define functions
//Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  } else {
    //create li element
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value + ' '));
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
  e.preventDefault();
}

//Remove Task

function removeTask(e) {
  if (e.target.hasAttribute('href')) {
    if (confirm('Are you Sure?')) {
      let ele = e.target.parentElement;
      //   console.log(ele);
      ele.remove();
      removeFromLS(ele);
    }
  }
}

//Clear Task

function clearTask(e) {
  //easy way
  //   taskList.innerHTML = '';
  //fast way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

//Filter task

function filterTask(e) {
  let text = e.target.value.toLowerCase();
  //   console.log(text);
  document.querySelectorAll('li').forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

//store in local storage

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get Task

function getTask(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task) => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(task + ' '));
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

//Remove from Local Storage

function removeFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
