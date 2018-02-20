const Sequelize = require('sequelize');
const sequelize = require('../db');
const Workouts = require('./workouts');

const Actuals = sequelize.define('actuals', {
  setNum: {
    type: Sequelize.INTEGER
  },
  actualReps: {
    type: Sequelize.INTEGER
  },
  actualWgt: {
    type: Sequelize.STRING
  }
});

Actuals.belongsTo(Workouts);

module.exports = Actuals;