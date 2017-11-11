const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chart = require('chart.js');

require('../db');

const Exercise = mongoose.model('Exercise');


router.get('/', function(req, res) {
    res.render('chart');
});


module.exports = router;