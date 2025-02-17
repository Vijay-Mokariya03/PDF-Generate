require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const strategy = require('./stratgies/local-stratgy');
const { v4: uuidv4 } = require('uuid');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  // genid: function (req) {
  //   return uuidv4(); // use UUIDs for session IDs
  // },
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  // store: MongoStore.create({
  //   mongoUrl: 'mongodb://localhost:27017/pdf',
  //   collectionName: 'sessions' // Optional: customize the collection name
  // }),
  cookie: {
    secure: false,
    maxAge: 60
  } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.post('/api/auth', passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(require('./middlewares/errorHandler'));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
