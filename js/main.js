class task{
    constructor(name,date,isDone = false){
        this.name = name;
        this.date = date;
        this.isDone = isDone;
    }

    getContentTask() {
        let checkIcon = this.isDone ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-minus"></i>`;
        let checkClassButton = this.isDone ? `check` : `uncheck`;
        return `<div class="task">
            <!-- task info-->
            <div class="task-info">
                <h3>${this.name}</h3>
                <span><i class="fa-regular fa-calendar"></i> ${this.date}</span>
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
    }
}

let tasks = [];

tasks.push(new task("Task one","01-01-2025",true));
tasks.push(new task("Task two","22-02-2025"));
tasks.push(new task("Task three","12-05-2025"));

let tasksElemnt = document.querySelector(".task-table-body");

tasksElemnt.innerHTML = "";

tasks.forEach((task) => {
    tasksElemnt.innerHTML += task.getContentTask();
});

/* modal styles*/

const closeModelCreate = document.getElementById("add-modal-close");
const openModelCreate = document.getElementById("add-modal-open");
const modalCreate = document.getElementById("add-modal");

openModelCreate.addEventListener("click", () => modalCreate.classList.add("show-modal"));
closeModelCreate.addEventListener("click", () => modalCreate.classList.remove("show-modal"));

window.addEventListener("click", (e) => {
  e.target === modalCreate ? modalCreate.classList.remove("show-modal") : false;
});


$('#form-add-task').validate();
document.getElementById("form-add-task").addEventListener('submit', (event) => { 
    event.preventDefault(); 
    console.log(event);
    if($("#form-add-task").valid()){
        const newTask = new task(event.target.name.value,event.target.date.value);
        newTask.getContentTask();
        tasksElemnt.innerHTML += newTask.getContentTask();
        event.target.name.value = "";
        event.target.date.value = "";
        modalCreate.classList.remove("show-modal");
    }
});
