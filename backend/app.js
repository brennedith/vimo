require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const passport = require('./configs/passport');

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) return console.log('We could not react the database provider.');

    console.log('Database connection established.');
  }
);

// Configure database to store sessions
const store = new MongoDBStore({
  uri: process.env.DB,
  collection: 'user-sessions'
});
store.on('error', error => {
  console.log(error);
});

const app = express();

// Configure express to use sessions
app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 Week
    },
    store,
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure CORS
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // TODO: Update origin
  })
);

// Other configurations
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));

module.exports = app;
