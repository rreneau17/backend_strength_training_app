var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');
const Op = Sequelize.Op;

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');
const Routines = require('../models/routines');
const Routine_exercise = require('../models/routine_exercise');
const Exercises = require('../models/exercises');

router.get('/', function(req, res, next) {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    Workouts.findAll({where: {date: {[Op.gt]: d}} 
    }).then (workouts => {
        // workouts.forEach(workout => {
        //     Actuals.findAll({where: {workoutId: workout.id} })
        // })
            res.render('results', {workouts});   
        })
        
  });
  
module.exports = router;