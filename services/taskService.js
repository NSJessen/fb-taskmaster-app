const crypto = require('crypto');
const { readTasks, updateTasks } = require('../utils/fileStore');
const { validateTaskText } = require('./taskValidator');
const { createQueryError } = require('../utils/errors');

async function getAllTasks() {
  return await readTasks();
}

async function createTask(text) {
  const validatedText = validateTaskText(text);

  const task = {
    id: crypto.randomUUID(),
    text: validatedText,
    status: 'todo',
    createdAt: new Date().toISOString()
  };

  await updateTasks((tasks) => [...tasks, task]);
  return task;
}

async function deleteTask(id) {
  await updateTasks((tasks) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);

    if (remainingTasks.length === tasks.length) { // Ingen opgave havde det id
      throw createQueryError('Ingen opgave fundet med det angivne id.');
    }

    return remainingTasks;
  });
}

module.exports = { getAllTasks, createTask, deleteTask };
