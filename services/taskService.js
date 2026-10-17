const crypto = require('crypto');
const { readTasks, writeTasks } = require('../utils/fileStore');

async function getAllTasks() {
  return await readTasks();
}

function validateTaskText(text) {
  if (text === undefined || text === null) {
    throw new Error('Task-tekst mangler.');
  }

  if (typeof text !== 'string') {
    throw new Error('Task-tekst skal være en streng.');
  }

  const trimmedText = text.trim();

  if (trimmedText.length === 0) {
    throw new Error('Task-tekst må ikke være tom.');
  }

  if (trimmedText.length > 200) {
    throw new Error('Task-tekst må højst være 200 tegn.');
  }

  return trimmedText;
}

async function createTask(text) {
  const validatedText = validateTaskText(text);
  const tasks = await readTasks();

  const task = {
    id: crypto.randomUUID(),
    text: validatedText,
    status: 'todo',
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  await writeTasks(tasks);
  return task;
}

async function deleteTask(id) {
  const tasks = await readTasks();
  const remainingTasks = tasks.filter((task) => task.id !== id);

  if (remainingTasks.length === tasks.length) { // Ingen opgave havde det id
    return false;
  }

  await writeTasks(remainingTasks);
  return true;
}

module.exports = { getAllTasks, createTask, deleteTask };
