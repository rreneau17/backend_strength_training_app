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

    let exerciseAll = [];
    var d = new Date();
    d.setDate(d.getDate() - 28);

    Exercises.findAll().then(exercises => {
        exerciseAll = exercises;
    })

    Workouts.findAll({where: {date: {[Op.gt]: d}} 
    }).then (workouts => {
        let workoutPromises = workouts.map(workout => {
            return Actuals.findAll({
                where: {workoutId: workout.id},
            })
        })
        console.log(workouts);
        console.log("about to Promise.all");
        Promise.all(workoutPromises).then (workoutActuals => {
            // res.json(workoutActuals);
            res.render('results', {
                workoutStr: JSON.stringify(workouts),
                actualsStr: JSON.stringify(workoutActuals),
                exerciseStr: JSON.stringify(exerciseAll)
            })
            
        });
               
    })
});
  
module.exports = router;