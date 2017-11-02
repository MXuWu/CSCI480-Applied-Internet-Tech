// db.js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// schema
const Exercise = new mongoose.Schema({
    name: String,
    reps: Number,
    sets: Number,
    goal: Number
});

const Workout = new mongoose.Schema({
    name: String,
    exercises: Array,
    completed: Date,
})

// create model, "register it"
// model acgts as a constructor for documents
mongoose.model('Exercise', Exercise);
mongoose.model('Workout', Workout);

mongoose.connect('mongodb://localhost/liftbig', {useMongoClient:true});