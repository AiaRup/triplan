const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const request = require('request');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const plansRouter = require('./routes/plans');
const emailRouter = require('./routes/email');

// const emailRouter = require('./routes/email');

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
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));

// adding CORS
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });


app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/plans', plansRouter);
app.use('/api/email', emailRouter);
// app.use('/api/email', emailRouter);
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