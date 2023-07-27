const { DataTypes } = require("sequelize");
const sequelize = require("../config/db-connection");

const Product = sequelize.define("products",{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type: DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING
    },
    code:{
        type:DataTypes.STRING
    },
    quantity:{
        type:DataTypes.INTEGER
    }
})

module.exports = Product;