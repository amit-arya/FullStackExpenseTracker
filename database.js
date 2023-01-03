const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('node-complete', 'root', 'abc', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;