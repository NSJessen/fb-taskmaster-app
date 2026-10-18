const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

router.get('/', async (req, res, next) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
