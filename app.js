const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
// const flash = require('connect-flash');

// set up passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const passportLocalMongoose = require('passport-local-mongoose');

// routes
const index = require('./routes/index');
const users = require('./routes/users');
const exercises = require('./routes/exercises');
const chart = require('./routes/chart');
const workouts = require('./routes/workouts');
const log = require('./routes/log');
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');

const app = express();


// view engine setup
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'test'}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());



// passport config
require('./db.js');
const User = mongoose.model('User');

// passport.use(new LocalStrategy(User.createStrategy()));
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(User.authenticate());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', index);
app.use('/users', users);
app.use('/exercises', exercises);
app.use('/chart', chart);
app.use('/workouts', workouts);
app.use('/log', log);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
