const User = require('./user-model')
const Role = require('./role-model')
const UserRoleMapping = require('./user-role-mapping')
const Product = require('./product-model')
const sequelize = require('../config/db-connection')

const ConnectToDatabase = async()=>[
    await sequelize.authenticate()
]

module.exports = {User, Role, UserRoleMapping, Product, ConnectToDatabase}