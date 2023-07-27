const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-day1', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize