const Exercises = require('./models/exercises');
const Routine_exercise = require('./models/routine_exercise');
const Routines = require('./models/routines');
const Workouts = require('./models/workouts');
const Actuals = require('./models/actuals');

Exercises.sync({force: true})
  .then(() => {
    return Routines.sync({force: true})
  })
  .then(() => {
    return Routine_exercise.sync({force: true})
  })
  .then(() => {
    return Workouts.sync({force: true})
  })
  .then(() => {
    return Actuals.sync({force: true})
  })
  .then(() => {
    console.log('Tables created.');
  })