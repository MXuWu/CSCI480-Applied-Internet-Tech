const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
require('../db.js');
const User = mongoose.model('User');

const document = new XMLHttpRequest;


router.get('/', function(req, res) {
    res.render('register');
});

router.post('/', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            const error = document.body.appendChild(document.createElement('div'));
            error.textContent = "There was a problem registering your account. Please try again!";
            error.className = "errorMessage";
            return res.render('register', { account : account });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });

});

module.exports = router;