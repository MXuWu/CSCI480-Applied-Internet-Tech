const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('login');
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        // failureFlash: true
    }), function (req, res) {
        res.redirect('/');
    }
);



module.exports = router;
