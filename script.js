// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("new-task");
const list = document.getElementById("tasks");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
renderTasks();

// Handle new task submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  saveAndRender();
  input.value = "";
});

// Save to localStorage and re‑render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Render the task list
function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");
    li.innerHTML = `
      <span class="text">${task.text}</span>
      <div class="actions">
        <button onclick="toggleDone(${idx})">✔️</button>
        <button onclick="deleteTask(${idx})">🗑️</button>
      </div>`;
    list.appendChild(li);
  });
}

// Toggle completion
window.toggleDone = (idx) => {
  tasks[idx].done = !tasks[idx].done;
  saveAndRender();
};

// Delete a task
window.deleteTask = (idx) => {
  tasks.splice(idx, 1);
  saveAndRender();
};
