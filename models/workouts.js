const Sequelize = require('sequelize');
const sequelize = require('../db');
const Routines = require('./routines');

const Workouts = sequelize.define('workouts', {
  date: {
    type: Sequelize.DATEONLY
  }
});

Workouts.belongsTo(Routines);

module.exports = Workouts;