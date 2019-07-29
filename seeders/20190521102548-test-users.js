'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

		return queryInterface.bulkInsert('users', [{
				firstName: 'vladimir',
				lastName: 'fomene',
				email: 'vladimirfomene@outlook.com',
				telephone: '+237699363080',
				status: 'active',
				role: 'healthstack',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				firstName: 'brandon',
				lastName: 'Odiwuor',
				email: 'brandon.odiwuor@gmail.com',
				telephone: '+254798962559',
				status: 'active',
				role: 'patient',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				firstName: 'toto',
				lastName: 'pasteur',
				email: 'toto@pasteur-yaounde.org',
				telephone: '+237699008468',
				status: 'active',
				role: 'lab agent',
				createdAt: new Date(),
				updatedAt: new Date()
			}], {})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
  }
};
