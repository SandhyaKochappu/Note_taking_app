const db = require("./db");//import the middleware created in db.js
const knex = require("knex")(db); 
// for Morgan logging
const fs = require("fs");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for morgan logging
const logStream = fs.createWriteStream(path.join(__dirname, "access.txt"), {
  flags: "a",
});

app.use(logger("common", { stream: logStream }));

//makes the database connection available to the application
app.use((req, res, next) => {
  req.db = knex;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);

//create a route to check the MySQL version installed on your system:for checking db connection
app.use("/version", (req, res) =>
  req.db.raw("SELECT VERSION()").then((version) => res.send(version[0][0]))
);

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
