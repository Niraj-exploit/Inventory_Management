'use strict';

const { User, Role } = require('../models');

const bcrypt = require('bcryptjs')
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const hashPassword = await bcrypt.hash(process.env.SEEDER_ADMIN_PASSWORD, 10)

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: process.env.SEEDER_ADMIN_NAME,
          email: process.env.SEEDER_ADMIN_EMAIL,
          password: hashPassword,
          address: process.env.SEEDER_ADMIN_ADDRESS,
          phone: process.env.SEEDER_ADMIN_CONTACT
        }
      ],
      {}
    );

    const adminUser = await User.findOne({
      where: { name: 'admin' },
      attributes: ['id']
    });

    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'admin',
          code: process.env.SEEDER_ADMIN_CODE
        },
        {
          name: 'editor',
          code: process.env.SEEDER_EDITOR_CODE
        },
        {
          name: 'user',
          code: process.env.SEEDER_USER_CODE
        }
      ],
      {}
    );

    const adminRole = await Role.findOne({
      where: { name: 'admin' },
      attributes: ['id']
    });

    await queryInterface.bulkInsert(
      'user_role_mapping',
      [
        {
          user_id: adminUser.id,
          role_id: adminRole.id
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('roles', null, {})
    await queryInterface.bulkDelete('user_role_mapping', null, {})
  }
};
