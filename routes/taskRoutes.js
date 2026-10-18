const express = require('express');
const router = express.Router();
const {createTask, deleteTask, getAllTasks} = require('../services/taskService');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const task = await createTask(req.body.text);
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        await deleteTask(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});
module.exports = router;
