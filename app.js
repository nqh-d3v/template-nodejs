/* eslint-disable consistent-return */
/* eslint-disable global-require */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const indexRouter = require('./src/api');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// các cài đặt cần thiết cho passport

app.use(session({
  secret: process.env.TOKEN_SECRET || 'a4f8071f-c873-4447-8ee323-4447-8ee323',
  cookie: { maxAge: 2628000000 },
  store: new (require('express-sessions'))({
    storage: 'mongodb',
    instance: mongoose, // optional
    host: 'localhost', // optional
    port: 27017, // optional
    db: process.env.DB_NAME || 'db-fp-nt208', // optional
    collection: 'sessions', // optional
    expire: 86400, // optional
  }),
  resave: true,
  saveUninitialized: true,
  unset: 'destroy',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

require('./src/api/auth/auth.passport')(passport); // pass passport for configuration
const configDB = require('./configs/database.js');

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.Promise = global.Promise;

mongoose.connect(configDB.url, connectOptions).then(() => {
  console.log('[!] - Connected to database');
}, (err) => {
  console.log(`[!] - Can't connect to database: ${err}`);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.statusCode === 401) return res.redirect('/login');

  if ([404, 500, 403].includes(err.statusCode)) return res.render(`error/error-${err.statusCode}`);

  // render the error page
  res.status(err.statusCode || 500);
  res.render('error/error-500');
});

module.exports = app;
