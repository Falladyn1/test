import * as bootstrap from "bootstrap";

const newTaskContent = document.getElementById('newTaskContent');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.querySelector('.app_content');
const template = document.getElementById("task_template");

const readFromLS = () => {
    const data = localStorage.getItem("MY_TASKS");
    if ( data ){
        tasks = JSON.parse(data);
    } else {
        tasks = [];
    }
}



const Task = (content) => {
    const timestamp = Date.now();
    return {
        id: crypto.randomUUID(),
        content: content,
        description: "",
        isDone: false,
        createdAt: timestamp,
        modifiedAt: timestamp
    }
}

const changeTaskStatus = (taskID) => {
    console.log(tasks);
    const myTask = tasks.find( x => x.id === taskID);
    myTask.isDone = !myTask.isDone;
    saveToLS();
}

const removeTask = (taskID) => {
    const index = tasks.findIndex( x => x.id === taskID);
    if ( index >= 0 ){
        tasks.splice(index, 1);
    }
}

const saveToLS = () => {
    localStorage.setItem("MY_TASKS", JSON.stringify(tasks));
}



const addTaskToUI = (task) => {
    const taskItem = template.content.cloneNode(true);
    taskItem.querySelector('.task_item').setAttribute("id", task.id);
    taskItem.querySelector('.task_content').innerHTML = task.content;
    taskItem.querySelector('.task_status').innerHTML = task.isDone?"done":"pending"
    taskItem.querySelector('.task_description').innerHTML = "Tutaj możesz dodać opis swojego zadania";

    taskItem.querySelector('.change_status').onclick = (e) => {
       const parentElement = e.target.closest('.task_item');
       const taskID = parentElement.id;
       changeTaskStatus(taskID);
       parentElement.querySelector('.task_status').innerHTML = tasks.find( x => x.id === taskID).isDone?"done":"pending";
    }

    taskItem.querySelector('.delete_task').onclick = (e) => {
        const parentElement = e.target.closest('.task_item');
        parentElement.remove();
        removeTask(task.id);
        saveToLS();
    }

    taskList.appendChild(taskItem);
}

addTaskButton.onclick = () => {
    console.log("OK");
    const taskContent = newTaskContent.value;
    
    const newTask = Task(taskContent);
    console.log(newTask);
    tasks.push(newTask);
    saveToLS();
    addTaskToUI(newTask);
    newTaskContent.value = "";
}

// INIT

let tasks = [];
readFromLS();
tasks.forEach( task => addTaskToUI(task) );
