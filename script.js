// Single Task Class
class SingleTask {
    constructor(taskDesc, isCompleted = false) {
        this.taskDesc = taskDesc; // string
        this.isCompleted = isCompleted; // bool
    }

    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
}

// Multiple Tasks List
class TaskList {
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

const taskListObj = new TaskList();

// DOM elements
let taskInput = document.querySelector("#newTaskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");
let taskDiv = document.querySelector(".taskDiv");
const clearAllBtn = document.querySelector("#clearAllBtn");

// Render function
const renderTasks = () => {
    taskDiv.innerHTML = ""; // Clear previous tasks
    const tasks = taskListObj.getAllTasks();

    if (tasks.length === 0) {
        taskDiv.innerHTML = "<p>No tasks yet! Add some above 👆</p>";
        return;
    }

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");

        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = task.isCompleted 
            ? `✅ ${task.taskDesc}`
            : `❌ ${task.taskDesc}`;

        if (task.isCompleted) {
            taskText.classList.add("completed-task");
        }

        // Toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click", () => {
            task.toggleCompletion();
            saveToLocalStorage();
            renderTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskListObj.deleteTask(index);
            saveToLocalStorage();
            renderTasks();
        });

        // Append elements
        taskElement.appendChild(toggleBtn);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(taskText);
        taskDiv.appendChild(taskElement);
    });
};

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    storedTasks.forEach(taskObj => {
        const task = new SingleTask(taskObj.taskDesc, taskObj.isCompleted);
        taskListObj.addTask(task);
    });

    renderTasks();
});

// Add task on click
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const singleTaskObj = new SingleTask(taskText);
        taskListObj.addTask(singleTaskObj);
        taskInput.value = "";
        renderTasks();
        saveToLocalStorage();
    }
});

// Add task on Enter key
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTaskBtn.click();
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    taskListObj.tasks = [];
    localStorage.removeItem("tasks");
    renderTasks();
});

// Built with love by erleen0307
