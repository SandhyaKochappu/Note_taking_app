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


app.use(bodyParser.json());
app.use('/api', notesRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '192.168.1.112', () => {
  console.log(`Server running on port ${PORT}`);
});


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

