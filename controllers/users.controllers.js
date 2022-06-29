
const { Users } = require('../models/users.model');

const { catchAsync } = require('../utils/catchAsync.util');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll();
  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await Users.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

const updateUserInfo = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(201).json({
    message: 'User updated',
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const userDeleted = await user.update({ status: 'Cancelled' });

  res.status(201).json({
    status: 'success',
    userDeleted,
  });
});

module.exports = { getAllUsers, createUser, updateUserInfo, deleteUser };
