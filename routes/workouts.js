const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');
const Workout = mongoose.model('Workout');
const Exercise = mongoose.model('Exercise');

router.get('/', function (req, res) {
    Workout.find((err, workouts) => {
        workouts.filter()
        if (err) {
            throw err;
        } else {
            Exercise.find((err, exercises) => {
                res.render('workouts', { workouts: workouts, exercises: exercises, user: req.user});
            });
        }
    });
});


router.post('/:id/delete', function (req, res) {
    const id = req.params.id;
    Workout.findOne({ _id: id }, (err, workout) => {
        workout.remove();
        workout.save((err) => {
            res.redirect('/workouts');
        });
    });
});

router.post('/:id/edit', function (req, res) {
    const id = req.params.id;
});

router.post('/', function (req, res) {
    const workout = new Workout({
        name: req.body.name
    });
    Exercise.find({ '_id': { $in: req.body.exerciseList } }, (err, exercises) => {
        if (err) {
            throw err;
        } else {
            workout.exercises = exercises;
            workout.save((err) => {
                if (err) {
                    throw err;
                } else {
                    res.redirect('/workouts');
                }
            });
        }
    });

});

module.exports = router;