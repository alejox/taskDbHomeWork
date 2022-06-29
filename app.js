const express = require('express');

//Routers
const { userRegistration } = require('./routes/users.routes');
const { taskRegistration } = require('./routes/tasks.routes');
//Global error controller
const {
  globalErrorHandler,
} = require('./controllers/globalErrorHandle.controllers');
//Utils
const { AppError } = require('./utils/appError.util');
//Init express app
const app = express();

app.use(express.json());
//Define endpoints
app.use('/api/v1/users', userRegistration);
app.use('/api/v1/tasks', taskRegistration);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

//Implementation of global error handler
app.use(globalErrorHandler);
module.exports = { app };
