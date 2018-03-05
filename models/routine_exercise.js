const Sequelize = require('sequelize');
const sequelize = require('../db');
const Exercises = require('./exercises');
const Routines = require('./routines');

const Routine_exercise = sequelize.define('routine_exercise', {
  orderNum: {
    type: Sequelize.INTEGER
  },
  weight: {
    type: Sequelize.INTEGER
  },
  sets: {
    type: Sequelize.INTEGER
  },
  reps: {
    type: Sequelize.INTEGER
  }
});

Routine_exercise.belongsTo(Routines);
Routine_exercise.belongsTo(Exercises)

module.exports = Routine_exercise;