import {getTasks} from './api.js';

const taskList = document.getElementById('task-list');

// Tegner hele listen forfra – kan kaldes igen efter ændringer
export function renderTasks(tasks) {
    taskList.replaceChildren();

    if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty';
        empty.textContent = 'Ingen opgaver endnu';
        taskList.append(empty);
        return;
    }

    for (const task of tasks) {
        const item = document.createElement('li');
        item.dataset.id = task.id;
        item.textContent = task.text;
        taskList.append(item);
    }
}

async function loadTasks() {
    try {
        renderTasks(await getTasks());
    } catch (err) {
        taskList.replaceChildren();
        const error = document.createElement('li');
        error.className = 'error';
        error.textContent = err.message;
        taskList.append(error);
    }
}

loadTasks();
