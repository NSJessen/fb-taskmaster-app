import {createTask, getTasks} from './api.js';

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

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

async function handleSubmit(event) {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) return; // Ignorer tomme indtastninger

    // Opretter opgaven via API'et og genindlæser listen
    try {
        await createTask(text);
        await loadTasks();
        taskInput.value = '';
        taskInput.focus();
    } catch (err) {
        console.error(err);
    }
}

taskForm.addEventListener('submit', handleSubmit);

loadTasks();
