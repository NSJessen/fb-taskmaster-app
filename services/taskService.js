const crypto = require('crypto');
const { readTasks, writeTasks } = require('../utils/fileStore');

async function getAllTasks() {
  return await readTasks();
}

async function createTask(text) {
  const tasks = await readTasks();

  const task = {
    id: crypto.randomUUID(),
    text,
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

  if (remainingTasks.length === tasks.length) { // No task had that id
    return false;
  }

  await writeTasks(remainingTasks);
  return true;
}

module.exports = { getAllTasks, createTask, deleteTask };
