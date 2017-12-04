const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username, password);
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
    }), function (req, res) {
        res.redirect('/');
    }
);



module.exports = router;
