const express = require('express');

const {
  createTaskValidator,
} = require('../middlewares/taskValidator.middleware');

const { taskExist } = require('../middlewares/taskExist.middleware');

const {
  createTask,
  getAllTasks,
  getTaskByStatus,
  updateTaskById,
  cancelTask,
} = require('../controllers/tasks.controllers');

const taskRegistration = express.Router();

taskRegistration.post('/', createTaskValidator, createTask);

taskRegistration.get('/', getAllTasks);

taskRegistration.get('/:status', getTaskByStatus);

taskRegistration.patch('/:id', taskExist, updateTaskById);

taskRegistration.delete('/:id', taskExist, cancelTask);

module.exports = { taskRegistration };
