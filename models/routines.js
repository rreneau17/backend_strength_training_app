const Sequelize = require('sequelize');
const sequelize = require('../db');

const Routines = sequelize.define('routines', {
  routineName: {
    type: Sequelize.STRING
  }
});

module.exports = Routines;