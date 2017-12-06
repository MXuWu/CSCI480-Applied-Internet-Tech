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
                if (req.user){
                    exercises = exercises.filter((ele) => {
                        if (!ele.user || ele.user._id === req.user._id){
                            return true;
                        }
                        return false;
                    })
                    res.render('exercises', {exercises: exercises, loggedIn: true});
                } else {
                    exercises = exercises.filter((ele) => {
                        if(!ele.user){
                            return true;
                        }
                        return false;
                    });
                    res.render('exercises', {exercises: exercises, loggedIn: false});
                }
            }
        });
});

router.get('/:id/edit', function (req, res) {
    const id = req.params.id;
    Exercise.findOne({_id:id}, (err, exercise)=>{
        res.render('edit', {exercise:exercise});
    });
});

router.post('/:id/edit', function(req, res) {
    const id = req.params.id; 
    Exercise.findOne({_id:id}, (err, exercise)=>{
        if(err){
            throw err;
        } else {
            console.log(req.body.goal);
            if(req.body.name){
                exercise.name = req.body.name;
            } 
            if(req.body.sets){
                exercise.sets = req.body.sets;
            }
            if(req.body.reps){
                exercise.reps = req.body.reps;
            }
            if(req.body.goal){
                console.log("exercise.goal = " + exercise.goal);
                exercise.goal = req.body.goal;
            }
            exercise.save(()=>{
                res.redirect('/exercises/' + id +'/edit');
            });
        }
    });

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
