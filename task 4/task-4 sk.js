// Get references to DOM elements
const form = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDateInput = document.getElementById('task-date');
const taskListSelect = document.getElementById('task-list');
const tasksContainer = document.getElementById('tasks-container');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
  tasksContainer.innerHTML = '';
  tasks.forEach((task) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

    taskDiv.innerHTML = `
      <span>${task.title} - ${new Date(task.date).toLocaleString()} (${task.list})</span>
      <div>
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    tasksContainer.appendChild(taskDiv);
  });
}

// Add a new task
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskTitleInput.value;
  const date = taskDateInput.value;
  const list = taskListSelect.value;

  const newTask = {
    id: Date.now(),
    title,
    date,
    list,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  form.reset();
});

// Toggle task completion
function toggleComplete(id) {
  tasks = tasks.map((task) => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Edit a task
function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    const newTitle = prompt('Edit Task Title:', task.title);
    if (newTitle) {
      task.title = newTitle;
      saveTasks();
      renderTasks();
    }
  }
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
