var express = require('express');
var router = express.Router();

const Workouts = require('../models/workouts');
const Actuals = require('../models/actuals');

router.route('/')
    .get((req, res) => {
        console.log('Its working');
        Workouts.findAll()
        .then(allWorkouts => {
            res.json(allWorkouts);
        });
    })
    .post((req, res) => {

        console.log(req.body);

        Workouts.create({
        date: req.body.date
        }).then(workout => {
            Actuals.create({
                setNum: req.body.setNum,
                actualReps: req.body.actualReps,
                actualWgt: req.body.actualWgt,
                routineId: req.body.routineId,
                exerciseId: req.body.exerciseId,
                workoutId: workout.id
            })
        });
    }) 

module.exports = router;