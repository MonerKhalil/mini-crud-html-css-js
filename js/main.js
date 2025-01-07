let tasks = [
    {
        "name" : "Task one",
        "date" : "01-01-2025",
        "isDone" : true,
    },
    {
        "name" : "Task two",
        "date" : "23-12-2025",
        "isDone" : false,
    },
    {
        "name" : "Task three",
        "date" : "23-05-2025",
        "isDone" : false,
    },
];

let tasksElemnt = document.querySelector(".task-table-body");

tasksElemnt.innerHTML = "";

tasks.forEach((task) => {
    let checkIcon = task.isDone ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-minus"></i>`;
    let checkClassButton = task.isDone ? `check` : `uncheck`;
    tasksElemnt.innerHTML += `<div class="task">
    <!-- task info-->
    <div class="task-info">
        <h3>${task.name}</h3>
        <span><i class="fa-regular fa-calendar"></i> ${task.date}</span>
    </div>
    <!-- task info-->

    <!-- task actions-->
    <div class="task-actions">
        <button class="circular button-${checkClassButton}">${checkIcon}</button>
        <button class="circular button-edit"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="circular button-delete"><i class="fa-solid fa-trash"></i></button>
    </div>
    <!-- task actions-->
</div>`;
});