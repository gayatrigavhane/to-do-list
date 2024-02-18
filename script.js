let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            text: taskText,
            dateAdded: new Date(),
            completed: false,
            dateCompleted: null
        };
        pendingTasks.push(task);
        updateLists();
        taskInput.value = "";
    }
}

function completeTask(index) {
    const task = pendingTasks[index];
    task.completed = true;
    task.dateCompleted = new Date();
    completedTasks.push(task);
    pendingTasks.splice(index, 1);
    updateLists();
}

function deleteTask(listType, index) {
    if (listType === "pending") {
        pendingTasks.splice(index, 1);
    } else {
        completedTasks.splice(index, 1);
    }
    updateLists();
}

function updateLists() {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.text} <button onclick="completeTask(${index})">Complete</button> <button onclick="deleteTask('pending', ${index})">Delete</button>`;
        pendingList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.text} <span class="completed">(Completed on ${task.dateCompleted.toLocaleString()})</span> <button onclick="deleteTask('completed', ${index})">Delete</button>`;
        completedList.appendChild(li);
    });
}
