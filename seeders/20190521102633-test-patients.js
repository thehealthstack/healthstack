'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.query("SELECT * FROM users WHERE email ='brandon.odiwuor@gmail.com'",
		 { type: Sequelize.QueryTypes.SELECT })
		.then(patientUsers => {
			let patients = [];
			patientUsers.forEach(patientUser => {
				patients.push({
					userId: patientUser.userId,
					createdAt: new Date(),
					updatedAt: new Date()
				});
			})
			return queryInterface.bulkInsert('patients', patients, {});
		})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users', null, {});
  }
};
