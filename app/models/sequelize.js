var Sequelize = require('sequelize'),
    config = require('../../config/database.js');

module.exports = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});
