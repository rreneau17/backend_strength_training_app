var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');
const Routines = require('../models/routines');
const Routine_exercise = require('../models/routine_exercise');
const Exercises = require('../models/exercises');

router.route('/')
    .get((req, res) => {
        console.log('Get is working');
        Routines.findOne({where: {active: true} })
        .then (routine => {
            console.log('The routine Id is: ' + routine.id);
            Routine_exercise.findAll({where: {routineId: routine.id} })
            .then (results => {
                console.log('Dev is working!!!')
                res.json(results);
            })
        })
    }) 
    // .get((req, res) => {
    //     console.log('Get is working');
    //     Routine_exercise.findAll() 
    //     .then (results => {
    //         res.json(results);
    //     })
    // })
    .post((req, res) => {

        console.log(req.body);

        Workouts.create({
        date: req.body.date,
        routineId: req.body.routineId
        }).then(workout => {
            Actuals.create({
                setNum: req.body.setNum,
                actualReps: req.body.actualReps,
                actualWgt: req.body.actualWgt,
                exerciseId: req.body.exerciseId,
                workoutId: workout.id
            })
        });
    }) 

module.exports = router;