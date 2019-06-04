"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.sequelize
      .query(
        "SELECT * FROM organizations WHERE category='laboratory' AND name='Centre Pasteur'",
        { type: Sequelize.QueryTypes.SELECT }
      ), queryInterface.sequelize
			.query(
				"SELECT * FROM users WHERE email='toto@pasteur-yaounde.org'",
				{ type: Sequelize.QueryTypes.SELECT }
			)])
      .then(([orgs, users]) => {
				let admins = [];
        admins.push({
					userId: users[0].userId,
					organizationId: orgs[0].organizationId,
					role: 'lab agent',
          password: bcrypt.hashSync('password', SALT_ROUNDS),
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
