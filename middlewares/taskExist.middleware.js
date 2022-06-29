const { Tasks } = require('../models/tasks.model');

const { AppError } = require('../utils/appError.util');

const { catchAsync } = require('../utils/catchAsync.util');

const taskExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findOne({ where: { id } });

  if (!task) {
    return next(new AppError('task not found', 404));
  }

  req.task = task;

  next();
});

module.exports = { taskExist };
