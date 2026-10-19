const taskService = require('../services/taskService');

// Fejl sendes videre til errorHandler med next()

async function getAllTasks(req, res, next) {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const task = await taskService.createTask(req.body.text);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        await taskService.deleteTask(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllTasks, createTask, deleteTask };
