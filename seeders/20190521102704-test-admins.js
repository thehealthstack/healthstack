'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query("SELECT * FROM users WHERE email='vladimirfomene@gmail.com' \
		 OR email='toto@pasteur-yaounde.org'", { type: Sequelize.QueryTypes.SELECT })
		.then(results => {
			let admins = [];
			results.forEach(result => {
				admins.push({
					userId: result.userId,
					password: 'password',
					createdAt: new Date(),
					updatedAt: new Date()
				});
			});
			return queryInterface.bulkInsert('admins', admins, {});
		});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('admins', null, {});
  }
};
