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


let dbconf;
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fs = require('fs');
    const path = require('path');
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
    // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/liftbig';
}


// mongoose.connect('mongodb://localhost/liftbig', {useMongoClient:true});
mongoose.connect(dbconf, { useMongoClient: true });
