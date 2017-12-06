const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');
const Exercise = mongoose.model('Exercise');

router.get('/', function(req, res) {
    if(req.user){
        Exercise.find((err, exercises) =>{
            if (err){
                throw err;
            } else {
                exercises = exercises.filter((ele) => {
                    if(ele.user){
                        console.log("ele.user._id = " + ele.user._id);
                        console.log("req.user._id = " + req.user._id);
                    }
                    if (!ele.user || ele.user._id === req.user._id){
                        return true;
                    }
                    return false;
                });
                res.render('exercises', {exercises: exercises});
            }
        });
    } else {
        res.render('exercises', {loggedIn: false});
    }
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
    console.log(req.user, "added an exercise");
    const exercise = new Exercise({
        name: req.body.name,
        reps: req.body.reps,
        sets: req.body.sets,
        goal: req.body.goal,
        user: req.user
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
