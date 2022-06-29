const express = require('express');


const { userRegistration } = require('./routes/users.routes');
const { taskRegistration } = require('./routes/tasks.routes');

const {
  globalErrorHandler,
} = require('./controllers/globalErrorHandle.controllers');

const { AppError } = require('./utils/appError.util');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRegistration);
app.use('/api/v1/tasks', taskRegistration);


app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});


app.use(globalErrorHandler);
module.exports = { app };
