const { Tasks } = require('../models/tasks.model');
const { catchAsync } = require('../utils/catchAsync.util');

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const newTask = await Tasks.create({
    title,
    userId,
    startDate: new Date(),
    limitDate,
  });

  res.status(201).json({
    status: 'success',
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Tasks.findAll();
  res.status(200).json({
    status: 'success',
    tasks,
  });
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  if (status === 'active' || 'completed' || 'late' || 'cancelled') {
    const info = await Tasks.findAll({ where: { status } });
    res.status(201).json({
      status: 'success',
      info,
    });
  }
});

const updateTaskById = catchAsync(async (req, res, next) => {
  const { finishDate } = req.body;

  const { task } = req;

  if (task.status === 'active') {
    await task.update({ finishDate });
    let limitDate = new Date(task.dataValues.limitDate);
    let finishDateUser = new Date(finishDate);

    if (finishDateUser.valueOf() < limitDate.valueOf()) {
      res.status(200).json({
        status: 'success',
        message: 'Completed',
        task,
      });
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Late',
        task,
      });
    }
  }
});

const cancelTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: 'Cancelled' });

  res.status(200).json({
    status: 'success',
    message: `The task was Cancelled`,
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskByStatus,
  updateTaskById,
  cancelTask,
};
