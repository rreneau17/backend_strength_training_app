const Sequelize = require('sequelize');
const sequelize = require('../db');

const Exercises = sequelize.define('exercises', {
  exerciseName: {
    type: Sequelize.STRING
  },
  picPath: {
    type: Sequelize.STRING
  },
  videoPath: {
    type: Sequelize.STRING
  },
  instructions: {
    type: Sequelize.STRING
  }
});

module.exports = Exercises;