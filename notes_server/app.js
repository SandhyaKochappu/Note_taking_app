//import the middleware created in db.js
const db = require("./db"); // This line should already exist
const knex = require("knex")(db); // This line is new
// for Morgan logging
const fs = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");
//POST and Security
// const helmet = require('helmet');
const cors = require('cors');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();

const { router: authRoutes, authenticate } = require('./routes/auth');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('common')); app.use(helmet());
app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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
app.use(bodyParser.json());
app.use('/api', notesRoutes);
app.use('/api/auth', authRoutes);
app.use('/', indexRouter);
app.use('/users', usersRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, '192.168.1.112', () => {
  console.log(`Server running on port ${PORT}`);
});


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
// module.exports = db;
