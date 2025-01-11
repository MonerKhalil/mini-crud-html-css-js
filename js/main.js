class task{
    constructor(name,date,isDone = false,id_task = null){
        this.id = id_task ?? (new Date().getUTCMilliseconds());
        this.name = name;
        const tempDate = moment(date);
        this.date = tempDate.format('YYYY-MM-DD');
        this.isDone = isDone;
    }

    getContentTask(withDiv = true) {
        let checkIcon = this.isDone ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-minus"></i>`;
        let checkClassButton = this.isDone ? `check` : `uncheck`;
        const mainContentDiv = `<!-- task info-->
        <div class="task-info">
            <h3>${this.name}</h3>
            <i class="fa-regular fa-calendar"></i> <span>${this.date}</span>
        </div>
        <!-- task info-->
    
        <!-- task actions-->
        <div class="task-actions">
            <button class="circular button-${checkClassButton}" onclick="changeStatus(this);">${checkIcon}</button>
            <button class="circular button-edit" onclick="btnOpenEditTask(this);"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="circular button-delete" onclick="deleteTask(this);"><i class="fa-solid fa-trash"></i></button>
        </div>
        <!-- task actions-->`;
        return withDiv ?`<div id=task_${this.id} class="task">${mainContentDiv}</div>` : mainContentDiv; 
    }

    setDataTask(task){
        this.id = task.id;
        this.name = task.name;
        this.date = task.date;
        this.isDone = task.isDone;
    }
}

const keyMyTasksInStorage = "MY-TASKS";

let tasks = [];

const tempData = localStorage.getItem(keyMyTasksInStorage);

if(tempData !== null){
    tempTasks = JSON.parse(tempData);
    tempTasks.forEach((item)=>{
        tasks.push(new task(item.name,item.date,item.isDone,item.id));
    });
}else{
    tasks.push(new task("Task one","01-01-2025",true));
    tasks.push(new task("Task two","02-22-2025"));
    tasks.push(new task("Task three","12-05-2025"));
    localStorage.setItem(keyMyTasksInStorage, JSON.stringify(tasks));
}

let tasksElemnt = document.querySelector(".task-table-body");

tasksElemnt.innerHTML = "";

tasks.forEach((task) => {
    tasksElemnt.innerHTML += task.getContentTask();
});

/*.......... start modal create .........*/

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
    if($("#form-add-task").valid()){
        const newTask = new task(event.target.name.value,event.target.date.value);
        tasksElemnt.innerHTML += newTask.getContentTask();
        event.target.name.value = "";
        event.target.date.value = "";
        modalCreate.classList.remove("show-modal");
        tasks.push(newTask);
        localStorage.setItem(keyMyTasksInStorage, JSON.stringify(tasks));
    }
});

/*.......... end modal create .........*/

/*.......... start modal edit .........*/

const closeModelEdit = document.getElementById("edit-modal-close");
const modalEdit = document.getElementById("edit-modal");

closeModelEdit.addEventListener("click", () => modalEdit.classList.remove("show-modal"));

window.addEventListener("click", (e) => {
  e.target === modalEdit ? modalEdit.classList.remove("show-modal") : false;
});

function btnOpenEditTask(btnCurrent){
    const taskDiv = btnCurrent.closest('div[id]');
    let idTask = taskDiv.id ?? null;
    idTask = idTask != null ? idTask.replace("task_","") : null; 
    const task = tasks.find(item => item.id == idTask);
    if (task) {
        const formEdit = document.getElementById("form-edit-task");
        formEdit.id_task.value = task.id;
        formEdit.name.value = task.name;
        formEdit.date.value = task.date;
        modalEdit.classList.add("show-modal");
    }    
}

$("#form-edit-task").validate();
document.getElementById("form-edit-task").addEventListener("submit",(event) => {
    event.preventDefault(); 
    if($("#form-edit-task").valid()){
        let currentTask = tasks.find(item => item.id == event.target.id_task.value);
        const newTask = new task(event.target.name.value,event.target.date.value,currentTask.isDone,currentTask.id);
        document.getElementById(`task_${newTask.id}`).innerHTML = newTask.getContentTask(false);
        tasks.map((task)=>{
            if(task.id == newTask.id){
                task.setDataTask(newTask);
            }
            return task;
        });
        modalEdit.classList.remove("show-modal");
        localStorage.setItem(keyMyTasksInStorage, JSON.stringify(tasks));
    }
});

/*.......... end modal edit .........*/

function deleteTask(btnCurrent){
    const taskDiv = btnCurrent.closest('div[id]');
    let idTask = taskDiv.id ?? null;
    idTask = idTask != null ? idTask.replace("task_","") : null;
    const indexRemove = tasks.findIndex(item => item.id == idTask);
    if(indexRemove != -1){
        tasks.splice(indexRemove, 1);
        taskDiv.remove();
        localStorage.setItem(keyMyTasksInStorage, JSON.stringify(tasks));
    }
}

function changeStatus(btnCurrent){
    const taskDiv = btnCurrent.closest('div[id]');
    let idTask = taskDiv.id ?? null;
    idTask = idTask != null ? idTask.replace("task_","") : null; 
    const task = tasks.find(item => item.id == idTask);
    if (task) {
        if(task.isDone){
            btnCurrent.classList.remove("button-check");            
            btnCurrent.classList.add("button-uncheck");
        }else{
            btnCurrent.classList.remove("button-uncheck");
            btnCurrent.classList.add("button-check");            
        }
        let checkIcon = !task.isDone ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-circle-minus"></i>`;
        btnCurrent.innerHTML = checkIcon;
        tasks.map((taskCurrent)=>{
            if(taskCurrent.id == task.id){
                taskCurrent.isDone = !taskCurrent.isDone;
            }
            return taskCurrent;
        });
        localStorage.setItem(keyMyTasksInStorage, JSON.stringify(tasks));
    }    
}