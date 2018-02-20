require('dotenv').config();

const Exercises = require('./models/exercises');
const Routines = require('./models/routines');
const Routine_exercise = require('./models/routine_exercise')
const Workouts = require('./models/workouts');
const Actuals = require('./models/actuals');

Exercises.create({
    exerciseName: 'Push-ups',
    picPath: './strengthApp/pics/',
    videoPath: './strengthApp/video/',
    instructions: "Starting Position: Kneel on an exercise mat or flooher behind you..."
})

Routines.create({
    routineName: 'Strength with Calisthenics'
})

Exercises.findById(1).then (exercise => {
    Routines.findById(1).then (routine => {
        Routine_exercise.create({
            orderNum: 1,
            weight: 'bw',
            sets: 2,
            reps: 20,
            routineId: routine.id,
            exerciseId: exercise.id
        })
    })
})

Routines.findById(1).then (routine => {
    Workouts.create({
        date: '2018-02-20'
    })
})

Workouts.findById(1).then (workout => {
    Routines.findById(1).then(routine => {
        Routine_exercise.findById(1).then(routine_exercise => {
            Actuals.create({
                setNum: 1,
                actualReps: 15,
                actualWgt: 'bw',
                excersiseId: routine_exercise.excersiseId,
                workoutId: workout.id
            })
        })
    })
})