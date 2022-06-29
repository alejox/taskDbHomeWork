const express = require('express');

const {
  createUserValidators,
} = require('../middlewares/userValidator.middleware');

const { userExist } = require('../middlewares/userExist.middleware');

const {
  getAllUsers,
  createUser,
  updateUserInfo,
  deleteUser,
} = require('../controllers/users.controllers');

const userRegistration = express.Router();

userRegistration.post('/', createUserValidators, createUser);
userRegistration.get('/', getAllUsers);
userRegistration.patch('/:id', userExist, updateUserInfo);
userRegistration.delete('/:id', userExist, deleteUser);

module.exports = { userRegistration };
