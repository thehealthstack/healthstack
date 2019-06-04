'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('organizations', [{
			name: 'Centre Pasteur',
    		telephone: '+237691819685',
    		email: 'cpc@pasteur-yaounde.org',
    		location: 'Yaounde, rue hopital centrale',
			address: 'BP 1274, Yaounde',
			status: 'active',
			category: 'laboratory',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'HealthStack',
			telephone: '+237690346872',
			email: 'healthstacker@gmail.com',
			location: 'Yaounde, Eleveur Street',
			category: 'admin',
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		}])
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('organizations', null, {});
  }
};
