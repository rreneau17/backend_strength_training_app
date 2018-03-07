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
    wrkAll = [];
    var d = new Date();
    d.setDate(d.getDate() - 7);
    Workouts.findAll({where: {date: {[Op.gt]: d}} 
    }).then (workouts => {
        workouts.forEach(workout => {
            Actuals.findAll({where: 
                {workoutId: workout.id} 
            }).then (actuals => {
                let actualsArray = actuals.map(actual => {
                    Exercises.findOne({where: {id: actual.exerciseId} })
                    .then (exercise => {
                        return {
                            weight: actual.actualWgt,
                            exerciseName: exercise.exerciseName
                        }
                    })
                })
            })

        })
            res.render('results', {workouts});
               
    })
});
  
module.exports = router;