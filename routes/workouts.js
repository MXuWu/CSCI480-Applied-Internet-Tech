const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db');
const Workout = mongoose.model('Workout');
const Exercise = mongoose.model('Exercise');

router.get('/', function (req, res) {
    Workout.find((err, workouts) => {
        
        if (err) {
            throw err;
        } else {
            if(req.user){
                workouts = workouts.filter((workout) => {
                    if(!workout.user || workout._id.equals(req.user._id)){
                        return true;
                    } 
                    return false;
                });
            } else {
                workouts = workouts.filter((workout) =>{
                    if (!workout.user){
                        return true;
                    } 
                    return false;
                });
            }
            Exercise.find((err, exercises) => {
                if (req.user){
                    exercises = exercises.filter((ele) => {
                        if (!ele.user || ele.user._id.equals(req.user._id)){
                            return true;
                        }
                        return false;
                    });
                } else {
                    exercises = exercises.filter((ele) => {
                        if (!ele.user){
                            return true;
                        }
                        return false;
                    });
                }
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

router.get('/:id/edit', function (req, res) {
    const id = req.params.id;
    Workout.findOne({_id:id}, (err, workout)=>{
        Exercise.find((err, exercises) => {
            if (err){
                throw err; 
            } else {
                if (req.user){
                    exercises = exercises.filter((ele) => {
                        if (!ele.user || ele.user._id.equals(req.user._id)){
                            return true;
                        }
                        return false;
                    });
                } else {
                    exercises = exercises.filter((ele) => {
                        if (!ele.user){
                            return true;
                        }
                        return false;
                    });
                }
                exercises = exercises.filter((ele) =>{
                    for(let i = 0; i < workout.exercises.length; i++){
                        if (ele._id.equals(workout.exercises[i]._id)){
                            return false;
                        }
                    }
                    return true;
                });
                res.render('editWorkout', {workout:workout, exercises: exercises});
            }
        });
    });
});

router.post('/', function (req, res) {
    const workout = new Workout({
        name: req.body.name,
        user: req.user
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

router.post('/:id/edit', function(req, res){
    const id = req.params.id;
    Workout.findOne({'_id':id}, (err, workout) =>{
        if(err){
            throw err;
        } else {
            console.log(req.body.addedExercises);
            if(req.body.addedExercises){
                Exercise.find({'_id': {$in: req.body.addedExercises}}, (err, exercise)=>{
                    console.log(exercise);
                    workout.exercises = workout.exercises.concat(exercise);
                    workout.save(()=>{
                        res.redirect(`/workouts/${id}/edit`);
                    });
                });
            }
        }
    });
});

router.post('/:workoutID/remove/:exerciseID', function(req, res) {
    const workoutID = req.params.workoutID;
    console.log("workoutID: " + workoutID);
    const exerciseID = req.params.exerciseID;
    Workout.findOne({'_id': workoutID}, (err, workout) => {
        console.log("find workout: " + workout.name);
        workout.exercises = workout.exercises.filter((exercise) => {
            if (exercise._id.equals(exerciseID)){
                return false;
            }
            return true;
        });
        workout.save(()=>{
            res.redirect(`/workouts/${workoutID}/edit`);
        });
    });
});

module.exports = router;