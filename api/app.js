const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const request = require('request');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const User = require('./models/userModel');
const Plan = require('./models/planModel').plan;

mongoose.Promise = global.Promise;
// Connect to DB and check the connection
const connection = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/triplanDB';
mongoose.connect(connection, { useNewUrlParser: true })
  .then(() => { console.log('Successfully connected to mongoDB'); })
  .catch(error => console.error(error));


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
// app.use(express.static('public'));
app.use(express.static('node_modules'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
