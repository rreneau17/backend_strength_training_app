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
    let wrkAll = [];
    var d = new Date();
    d.setDate(d.getDate() - 7);
    Workouts.findAll({where: {date: {[Op.gt]: d}} 
    }).then (workouts => {
        let workoutPromises = workouts.map(workout => {
            return Actuals.findAll({
                where: {workoutId: workout.id},
            })
            //.then (actuals => {
                // let actualsPromises = actuals.map(actual => {
                //     return Exercises.findOne({where: {id: actual.exerciseId} })
                //     .then (exercise => {
                //         return {
                //             ...actual,
                //             exerciseName: exercise.exerciseName
                //         }
                //         // res.json(exercise);
                //     })
                // })
                // Promise.all(actualsPromises) 
                // .then (promisesResults => {
                //     res.json(promisesResults);
                // })
            //     return actuals;
            // })
            
        })
        console.log(workouts);
        console.log("about to Promise.all");
        Promise.all(workoutPromises).then (workoutActuals => {
            console.log('promise.all is working');
            res.json(workoutActuals);
            // let exercisePromises = workoutActuals.map(actualsArray=> {
            //     let exercisesArray = [];
            //     actualsArray.forEach(act => {
            //         exercisesArray = exercisesArray.concat(Exercises.findOne({where: {id: act.exerciseId} }))
                    
            //     })
            //      return exercisesArray;
            // })
            // Promise.all(exercisePromises).then (exerciseResults => {
            //     console.log(exerciseResults.length);
            //     let actualsWithResults = workoutActuals.map((actArray, i) => {
            //         let exercisesPromisesForActuals = exerciseResults[i];
            //         console.log('about to merge actuals and exercises');
            //         return Promise.all(exercisesPromisesForActuals).then(exercisesForActuals => {
            //             return actArray.map((a, j) => {
            //                 console.log(a);
            //                 let e = exercisesForActuals[j];
            //                 // debugger;
            //                 return {
            //                     ...a,
            //                     exerciseName: e.exerciseName
            //                 }
            //             })
            //         })
                    
                    
            //     })
            //     console.log("about to send json");
            //     res.json(actualsWithResults);
            // })
            
        });

            //res.json(wrkAll);
            // res.render('results', {workouts});
               
    })
});
  
module.exports = router;