const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Workout = mongoose.model("Workout");
const Log = mongoose.model("Log");

router.get('/', function(req, res) {
    Log.find((err, logs)=>{
        if (err){
            throw err;
        } else {
            Workout.find((err, workouts) => {
                workouts = workouts.filter((ele) => {
                    if (!ele.user || req.user === ele.user){
                        return true;
                    }
                    return false;
                });
                res.render('log', {logs:logs, workouts: workouts});
            });     
        }
    });
});

router.post('/', function(req, res) {
    const log = new Log({
        user: req.user,
        date: req.body.logDate
    });
    Workout.findOne({name:req.body.workout}, (err, workout) =>{
        if (err){
            throw err;
        } else {
            log.workout = workout;
            log.save((err) => {
                if (err){
                    throw err;
                } else {
                    res.redirect('/log');
                }
            });
        }
    });
});

module.exports = router;