// DOM references
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const list = document.getElementById('task-list');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');

const STORAGE_KEY = 'tasks';
let tasks = [];
let filter = 'all';
let searchQuery = '';

// load saved tasks from localStorage
const loadTasks = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  tasks = raw ? JSON.parse(raw) : [];
};

// save tasks to localStorage
const saveTasks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

// create a new task object
const createTask = title => ({
  id: Date.now().toString(),
  title: title.trim(),
  completed: false,
});

// add a task to the list
const addTask = title => {
  tasks.push(createTask(title));
  saveTasks();
  render();
};

// delete a task by id
const deleteTask = id => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
};

// toggle completed state
const toggleTaskComplete = id => {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
};

// edit the title of a task
const editTask = id => {
  const task = tasks.find(task => task.id === id);
  if (!task) return;

  const updated = prompt('Edit task title', task.title);
  if (!updated) return;

  const trimmed = updated.trim();
  if (!trimmed) return;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, title: trimmed } : task
  );
  saveTasks();
  render();
};

// filter and search tasks
const getVisibleTasks = () => {
  const query = searchQuery.trim().toLowerCase();
  return tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    const matchesSearch = !query || task.title.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
};

// update counter display
const updateCounters = () => {
  totalCount.textContent = `Total: ${tasks.length}`;
  completedCount.textContent = `Completed: ${tasks.filter(task => task.completed).length}`;
};

// build task item DOM node
const buildTaskItem = task => {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id;

  const left = document.createElement('div');
  left.className = 'task-left';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTaskComplete(task.id));

  const title = document.createElement('span');
  title.className = `task-title${task.completed ? ' completed' : ''}`;
  title.textContent = task.title;

  left.append(checkbox, title);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => editTask(task.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  actions.append(editBtn, deleteBtn);
  li.append(left, actions);

  return li;
};

// render the task list and counters
const render = () => {
  list.innerHTML = '';
  const visible = getVisibleTasks();

  if (visible.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No tasks found. Add a task or adjust the search/filter.';
    list.appendChild(empty);
  } else {
    visible.forEach(task => list.appendChild(buildTaskItem(task)));
  }

  updateCounters();
};

// event handlers
form.addEventListener('submit', e => {
  e.preventDefault();
  const taskTitle = input.value.trim();
  if (!taskTitle) return;
  addTask(taskTitle);
  input.value = '';
});

searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  render();
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filter = button.dataset.filter;
    render();
  });
});

// initialize app
loadTasks();
render();
