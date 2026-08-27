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

app.use((req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
module.exports = app;
