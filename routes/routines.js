var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');
const Routines = require('../models/routines');
const Routine_exercise = require('../models/routine_exercise');
const Exercises = require('../models/exercises');

// router.route('/:routineId')
//     .get((req, res) => {
router.get('/:routineId', function(req, res, next) {
    Routines.findOne({where: {id: req.param('routineId')} })
    .then (routine => {
        Routine_exercise.findAll({
            where: {routineId: routine.id}, 
            order: sequelize.col('orderNum')
        })
        .then (results => {
            const exercisePromises = results.map(result => {
                return Exercises.findOne({where: {id: result.exerciseId} })
                // .then (exercise => {
                    
                    // res.json(exercise);
                // })
            })
            Promise.all(exercisePromises) 
            .then (exerciseResults => {
                let exerciseArray = results.map((result, i) => {
                    return {
                        // ...result, 
                        exerciseName: exerciseResults[i].exerciseName,
                        exerciseId: result.exerciseId,
                        orderNum: result.orderNum,
                        weight: result.weight,
                        reps: result.reps,
                        sets: result.sets
                    }
                })
                let rntResults = {
                    routineName: routine.routineName,
                    routineId: routine.id,
                    exercises: exerciseArray

                }
                console.log(rntResults);
                res.json(rntResults);


            })

        })
    })
})

router.get('/:routineId/edit', function(req, res, next) {
    
    Routines.findOne({where: {id: req.param('routineId')} })
    .then (routine => {
        Routine_exercise.findAll({
            where: {routineId: routine.id}, 
            order: sequelize.col('orderNum')
        })
        .then (results => {
            const exercisePromises = results.map(result => {
                return Exercises.findOne({where: {id: result.exerciseId} })
                // .then (exercise => {
                    
                    // res.json(exercise);
                // })
            })
            Promise.all(exercisePromises) 
            .then (exerciseResults => {
                let exerciseArray = results.map((result, i) => {
                    return {
                        // ...result, 
                        exerciseName: exerciseResults[i].exerciseName,
                        exerciseId: result.exerciseId,
                        orderNum: result.orderNum,
                        weight: result.weight,
                        reps: result.reps,
                        sets: result.sets
                    }
                })
                let rntResults = {
                    routineName: routine.routineName,
                    routineId: routine.id,
                    exercises: exerciseArray

                }
                console.log(rntResults);
                // res.json(rntResults);
                res.render('routines', {rntResults});
            })

        })
    })
})


module.exports = router;