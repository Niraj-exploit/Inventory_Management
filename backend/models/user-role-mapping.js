const { DataTypes } = require('sequelize')
const sequelize = require('../config/db-connection')
const User = require('./user-model')
const Role = require('./role-model')

const UserRoleMapping = sequelize.define("user_role_mapping",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: "id"
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "id"
        }
    }
},
{
    freezeTableName: true
})

module.exports = UserRoleMapping