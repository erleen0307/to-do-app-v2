// Single Task Class
class singleTask {
    constructor(taskDesc, isCompleted = false) {
        this.taskDesc = taskDesc; // string
        this.isCompleted = isCompleted; // bool
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted; // true <--> false
    }
}

// Multiple Tasks List
class taskList {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    addTask(taskObj) {
        this.tasks.push(taskObj);
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
    }

    getAllTasks() {
        return this.tasks;
    }
}

function saveToLocalStorage() {
  const plainTasks = taskListObj.getAllTasks().map(task => ({
    taskDesc: task.taskDesc,
    isCompleted: task.isCompleted
  }));
  localStorage.setItem("tasks", JSON.stringify(plainTasks));
}

// ---------------- DOM & Logic ----------------

// Persistent task list object
const taskListObj = new taskList();

// DOM elements
let taskInput = document.querySelector("#newTaskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let taskDiv = document.querySelector(".taskDiv");

// Render function
if (tasks.length === 0) {
  taskDiv.innerHTML = "<p>No tasks yet! Add some above 👆</p>";
  return;
}

const renderTasks = () => {
    taskDiv.innerHTML = ""; // Clear previous tasks

    const tasks = taskListObj.getAllTasks();
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = task.isCompleted 
            ? `✅ ${task.taskDesc}`
            : `❌ ${task.taskDesc}`;

        // Apply class if completed
        if (task.isCompleted) {
            taskText.classList.add("completed-task");
        }

        // Toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click", () => {
            task.toggleCompletion();
            // save to local storage
            saveToLocalStorage(); 
            renderTasks();

        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskListObj.deleteTask(index);
            // save to local storage
            saveToLocalStorage(); 

            renderTasks();
        });

        // Append to task element
        taskElement.appendChild(toggleBtn);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(taskText);

        // Append to DOM
        taskDiv.appendChild(taskElement);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Convert plain objects to class instances
  storedTasks.forEach(taskObj => {
    const task = new singleTask(taskObj.taskDesc, taskObj.isCompleted);
    taskListObj.addTask(task);
  });

  renderTasks();
});

// Add task on button click
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const singleTaskObj = new singleTask(taskText);
        taskListObj.addTask(singleTaskObj);
        taskInput.value = ""; // clear input
        renderTasks();
        // save to local storage
        saveToLocalStorage(); 

    }
});

// Add task same as click when Enter is pressed
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

// clear All Button
const clearAllBtn = document.querySelector("#clearAllBtn");

clearAllBtn.addEventListener("click", () => {
  taskListObj.tasks = []; // Clear the tasks array
  localStorage.removeItem("tasks"); // Remove from localStorage
  renderTasks(); // Re-render UI
});

// Built with love by erleen0307