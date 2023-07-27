'use strict';

const { DataTypes } = require("sequelize")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
     await queryInterface.createTable('products', { 
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
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('products')
  }
};
