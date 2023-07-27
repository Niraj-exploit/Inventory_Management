'use strict';

const { DataTypes } = require('sequelize');
const {User , Role} = require('../models');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_role_mapping', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: User.tableName,
          key: 'id'
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Role.tableName,
          key: 'id'
        }
      }
    });

    await queryInterface.addConstraint('user_role_mapping', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_user_role_mapping_user_id',
      references: {
        table: User.tableName,
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('user_role_mapping', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_role_mapping_role_id',
      references: {
        table: Role.tableName,
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_role_mapping');
  }
};
