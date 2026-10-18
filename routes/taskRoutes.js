const express = require('express');
const router = express.Router();
const {createTask, getAllTasks} = require('../services/taskService');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = await createTask(req.body.text);
        res.status(201).json(task);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({error: error.message});
        }
        next(error);
    }
});

module.exports = router;
