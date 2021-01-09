const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const streamInfoRouter = require('./routes/streamInfoApi');
const streamImageRouter = require('./routes/streamImage');
const weatherImageRouter = require('./routes/weatherImage');

const apiRouter = require('./routes/api');

const { registerFont } = require('canvas')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use('/api', streamInfoRouter, apiRouter);
app.use('/image', streamInfoRouter, streamImageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

console.log('registering fonts - start');
registerFont('assets/fonts/Goldie Boxing.ttf', { family: 'Goldie Boxing' })
console.log('registering fonts - done');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  res.render('error');
});

module.exports = app;