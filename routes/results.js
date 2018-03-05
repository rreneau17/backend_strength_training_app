var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');
const Routines = require('../models/routines');
const Routine_exercise = require('../models/routine_exercise');
const Exercises = require('../models/exercises');

router.get('/', function(req, res, next) {
    Workouts.findAll()
        .then (workouts => {
            // const actualsPromises = workouts.map(workout => {
            //     return Actuals.findAll({where: {workoutId: workout.id} })
            // })
            // Promise.all(actualsPromises)
            // .then (actResults => {
            //     res.json(actResults);    
            // })
            // res.json(workouts); 
            res.render('results', {workouts});   
        })
        
  });
  
module.exports = router;