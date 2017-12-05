const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');
const Exercise = mongoose.model('Exercise');

router.get('/', function(req, res) {
    Exercise.find((err, exercises) =>{
        if (err){
            throw err;
        } else {
            res.render('exercises', {exercises: exercises});
        }
    });
});

router.get('/:name', function (req, res) {
    const name = req.params.name;
    Exercise.findOne({name:name}, (err, exercise)=>{
        res.render('name', {exercise:exercise});
    });
});

router.post('/:id/edit', function(req, res) {
    const id = req.body.id; 

});


router.post('/:id/delete', function(req, res){
    const id = req.params.id;
    Exercise.findOne({_id:id}, (err, exercise)=>{
        exercise.remove();
        exercise.save((err) => {
            res.redirect('/exercises');
        });
    });
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
            res.redirect('/exercises');
        }
    });
});

module.exports = router;
