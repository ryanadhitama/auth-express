'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
const names = ['User', 'Admin'];

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = '1234567';
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const timestamp = new Date();

    const users = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@mailinator.com`,
      password: encryptedPassword,
      created_at: timestamp,
      updated_at: timestamp
    }));

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'users',
      {
        name: {
          [Op.in]: names
        }
      },
      {}
    );
  }
};
