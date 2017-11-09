const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');


const Exercise = mongoose.model('Exercise');


/* GET home page. */
router.get('/', function (req, res, next) {
    Exercise.find((err, exercises) =>{
        if (err){
            throw err;
        } else {
            res.render('index', { title: 'Express', exercises: exercises});
        }
    })
});

router.post('/', function (req, res) {
    const exercise = new Exercise({
        name: req.body.name,
        reps: req.body.reps,
        sets: req.body.sets,
        goal: req.body.goal
    });
    exercise.save((err) => {
        if (err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
