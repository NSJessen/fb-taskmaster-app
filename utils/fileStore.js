const fs = require('fs-extra');
const path = require('path');

const tasksFilePath = path.join(__dirname, '..', 'data', 'tasks.json');

async function readTasks() {
  try {
    return await fs.readJson(tasksFilePath);
  } catch (error) {
    if (error.code !== 'ENOENT') { // Hvis fejlen ikke er "filen findes ikke", så send den videre
      throw error;
    }

    const tasks = [];
    await writeTasks(tasks);
    return tasks;
  }
}

async function writeTasks(tasks) {
  await fs.writeJson(tasksFilePath, tasks, { spaces: 2 });
}

module.exports = { readTasks, writeTasks };
