var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');
const Routines = require('../models/routines');
const Routine_exercise = require('../models/routine_exercise');
const Exercises = require('../models/exercises');

/* GET home page. */
router.get('/', function(req, res, next) {
  let rntAll = [];
  Routines.findAll()
      .then (routines => {
        routines.forEach(routine=> {
          Routine_exercise.findAll({
            where: {routineId: routine.id}, 
            order: sequelize.col('orderNum')
          }).then (results => {
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
                    routineURL: routine.routineURL,
                    routinePic: routine.routinePic,
                    exercises: exerciseArray

                }
                // console.log(rntResults);
                // res.json(rntResults);
                rntAll.push(rntResults);
                if (rntAll.length === routines.length) {
                  // res.json(rntAll);
                  res.render('index', {
                    
                    rntAll,
                    rntAllString: JSON.stringify(rntAll)
                  
                  });
                }
            })
          })
        })  
      })
      
});

module.exports = router;
