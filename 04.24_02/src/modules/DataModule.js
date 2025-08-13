import { saveToLS } from '../modules/LSModule.js';

const tasks = [];


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
    const myTask = tasks.find( x => x.id === taskID);
    myTask.isDone = !myTask.isDone;
    saveToLS(tasks);
}

const removeTask = (taskID) => {
    const index = tasks.findIndex( x => x.id === taskID);
    if ( index >= 0 ){
        tasks.splice(index, 1);
    }
    saveToLS(tasks);
}

export default Task;
export {changeTask, removeTask};