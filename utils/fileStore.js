const fs = require('fs-extra');
const path = require('path');

const tasksFilePath = path.join(__dirname, '..', 'data', 'tasks.json');
const tempFilePath = `${tasksFilePath}.tmp`;

// Kø, så samtidige requests ikke overskriver hinandens ændringer
let queue = Promise.resolve();

function addToQueue(operation) {
  const result = queue.then(operation);
  queue = result.catch(() => {}); // En fejl må ikke stoppe de næste
  return result;
}

async function readFromFile() {
  try {
    return await fs.readJson(tasksFilePath);
  } catch (error) {
    if (error.code !== 'ENOENT') { // Hvis fejlen ikke er "filen findes ikke", så send den videre
      throw error;
    }

    const tasks = [];
    await writeToFile(tasks);
    return tasks;
  }
}

// Skriver til en midlertidig fil først, så tasks.json ikke ødelægges ved et crash
async function writeToFile(tasks) {
  await fs.writeJson(tempFilePath, tasks, { spaces: 2 });
  await fs.rename(tempFilePath, tasksFilePath);
}

function readTasks() {
  return addToQueue(readFromFile);
}

// Læs → ændr → skriv som én operation i køen
function updateTasks(change) {
  return addToQueue(async () => {
    const tasks = await readFromFile();
    const updatedTasks = await change(tasks);
    await writeToFile(updatedTasks);
  });
}

module.exports = { readTasks, updateTasks };
