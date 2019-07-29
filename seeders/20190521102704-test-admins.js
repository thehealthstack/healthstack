"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.sequelize
      .query(
        "SELECT * FROM organizations WHERE category='admin' AND name='HealthStack'",
        { type: Sequelize.QueryTypes.SELECT }
      ), queryInterface.sequelize
			.query(
				"SELECT * FROM users WHERE email='vladimirfomene@outlook.com'",
				{ type: Sequelize.QueryTypes.SELECT }
			)])
      .then(([orgs, users]) => {
				let admins = [];
        admins.push({
					userId: users[0].userId,
					organizationId: orgs[0].organizationId,
					role: 'healthstack',
          password: bcrypt.hashSync('kovich2002', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date()
				});
				return queryInterface.bulkInsert('admins', admins, {});
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("admins", null, {});
  }
};
