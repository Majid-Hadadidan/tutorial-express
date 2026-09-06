const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const morgan = require('morgan');
const app = express();
app.set('query parser', 'extended');
// 1) GLOBAL MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// 2) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('/{*splat}', (req, res, next) => {
  const err = new Error(
    `Can't find ${req.originalUrl} on this server`
  );

  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});
module.exports = app;
