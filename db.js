const Sequelize = require('sequelize');
const sequelize = new Sequelize('strengthApp-DB', 'richreneau', '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;