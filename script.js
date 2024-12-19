document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (completed) {
            taskItem.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskItem.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'bg-green-500 text-white px-4 py-2 rounded';
        completeButton.addEventListener('click', function () {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskItem.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 text-white px-4 py-2 rounded';
        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed: completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});
