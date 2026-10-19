import {createTask, getTasks, deleteTask} from './api.js';

const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const errorMessage = document.getElementById('error-message');

// Tegner hele listen forfra – kan kaldes igen efter ændringer
function renderTasks(tasks) {
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

        const label = document.createElement('span');
        label.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete';
        deleteButton.textContent = '🗑️';
        deleteButton.setAttribute('aria-label', 'Slet opgave');

        item.append(label, deleteButton);
        taskList.append(item);
    }
}

// Viser fejlen på siden og logger den i konsollen
// action fortæller brugeren, hvad der ikke lykkedes, fx "Opgaven blev ikke gemt"
function showError(action, err) {
    console.error(err);
    errorMessage.textContent = `${action}: ${err.message}`;
    errorMessage.hidden = false;
}

// Skjuler fejlbeskeden igen efter en vellykket handling
function clearError() {
    errorMessage.textContent = '';
    errorMessage.hidden = true;
}

async function loadTasks() {
    try {
        renderTasks(await getTasks());
        clearError();
    } catch (err) {
        showError('Opgaverne kunne ikke hentes', err);
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
        showError('Opgaven blev ikke gemt', err);
    }
}

async function handleDelete(event) {
    const button = event.target.closest('.delete');
    if (!button) return;

    const id = button.closest('li').dataset.id;

    // Sletter opgaven via API'et og genindlæser listen
    try {
        await deleteTask(id);
        await loadTasks();
    } catch (err) {
        showError('Opgaven blev ikke slettet', err);
    }
}

taskList.addEventListener('click', handleDelete);
taskForm.addEventListener('submit', handleSubmit);

loadTasks();
