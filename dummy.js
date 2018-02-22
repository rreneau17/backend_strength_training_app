require('dotenv').config();

const Exercises = require('./models/exercises');
const Routines = require('./models/routines');
const Routine_exercise = require('./models/routine_exercise')
const Workouts = require('./models/workouts');
const Actuals = require('./models/actuals');

// Routines.create({
//     routineName: 'Basic Strength'
// })

Routines.findOne({where: {routineName: 'Basic Strength'}
    }).then (routine => {
        Exercises.create({
            exerciseName: 'Back Extension',
            picPath: './strengthApp/pics/',
            videoPath: './strengthApp/video/',
            instructions: "instructions for Back Extension..."
        }).then (exercise => {
            Routine_exercise.create({
                orderNum: 2,
                weight: 'bw',
                sets: 2,
                reps: 20,
                routineId: routine.id,
                exerciseId: exercise.id
            })
        });
    });


    // .then (routine_exercise => {
            //     Workouts.create({
            //         date: '2018-02-20',
            //         routineId: routine.id
            //     }).then (workout => {
            //         Actuals.create({
            //             setNum: 1,
            //             actualReps: 15,
            //             actualWgt: 'bw',
            //             excersiseId: routine_exercise.excersiseId,
            //             workoutId: workout.id
            //         })  
            //     });
            // });
        //  });

