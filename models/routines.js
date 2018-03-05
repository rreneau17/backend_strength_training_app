const Sequelize = require('sequelize');
const sequelize = require('../db');

const Routines = sequelize.define('routines', {
  routineName: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  routineURL: {
    type: Sequelize.STRING
  },
  routinePic: {
    type: Sequelize.STRING
  }
});

module.exports = Routines;