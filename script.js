// Run this code after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to hold tasks in memory
    let tasks = [];

    // Save current tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(function (taskText) {
            addTask(taskText, false); // false = don't save again to Local Storage
        });
    }

    // Function to add a new task
    // taskText: optional (used when loading from Local Storage)
    // save: whether to save to Local Storage (default true)
    function addTask(taskText, save = true) {
        // If no taskText passed, read from input
        const text = typeof taskText === 'string'
            ? taskText.trim()
            : taskInput.value.trim();

        // If the input is empty, alert the user
        if (text === '') {
            alert('Please enter a task.');
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove this task
        removeButton.onclick = function () {
            taskList.removeChild(li);

            // Remove this task from the tasks array
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(li);

        // If needed, save this task to Local Storage
        if (save) {
            tasks.push(text);
            saveTasks();
        }

        // Clear the input field when the task was added from input
        if (typeof taskText !== 'string') {
            taskInput.value = '';
        }
    }

    // Add an event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add an event listener to taskInput for the 'keypress' event
    // to allow adding tasks by pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page is ready
    loadTasks();
});

