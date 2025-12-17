// Ensure the script runs after the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Select page elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task when button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Add button to task item
        li.appendChild(removeButton);

        // Add task item to the list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    }

    // Add task when the button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

