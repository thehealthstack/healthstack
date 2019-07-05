const { check } = require('express-validator/check');

exports.admins = {
	post: [
		check("email")
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone")
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone number is not valid"),
		check("password")
			.isLength({ min: 8 })
			.withMessage("Password must be atleast 8 characters")
	],
	put: [
		check("email").optional()
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone").optional()
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone number is not valid"),
		check("password").optional()
			.isLength({ min: 8 })
			.withMessage("Password must be atleast 8 characters"),
		check("organizationId").optional()
			.isUUID()
			.withMessage("OrganizationId must be a UUID"),
		check("role").optional()
			.isIn(["patient", "healthstack", "lab agent"])
			.withMessage("Role must be either patient, healthstack, lab agent"),
		check("status").optional()
			.isIn(["active", "pending"])
			.withMessage("Status must be either pending or active")
	],
};

exports.auth = {
	login: [
		check("email")
				.isEmail()
				.withMessage("Email format is not valid"),
			check("password")
				.isLength({ min: 8 })
				.withMessage("Password must be atleast 8 characters")
	],
};

exports.labAgents = {
	post: [
		check("email")
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone")
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone number is not valid"),
		check("password")
			.isLength({ min: 8 })
			.withMessage("Password must be atleast 8 characters")
	],
	put: [
		check("email").optional()
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone").optional()
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone number is not valid"),
		check("password").optional()
			.isLength({ min: 8 })
			.withMessage("Password must be atleast 8 characters"),
		check("role").optional()
			.isIn(["patient", "healthstack", "lab agent"])
			.withMessage("Role must be either patient, healthstack, lab agent"),
		check("status").optional()
			.isIn(["active", "pending"])
			.withMessage("Status must be either pending or active")
	],
};

exports.medicalresults = {
	put: [
		check("adminId")
				.isUUID()
			.withMessage("adminId should be UUID"),
		check("patientId")
				.isUUID()
			.withMessage("patientId should be UUID"),
		check("organizationId")
				.isUUID()
			.withMessage("organizationId should be UUID")
	],
};

exports.organizations = {
	post: [
		check('telephone').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
		check('email').isEmail().withMessage('Email format not valid')
	],
	put: [
		check('telephone').optional().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
		check('email').optional().isEmail().withMessage('Email format not valid')
	],
};

exports.patients = {
	post: [
		check("email")
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone")
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone is not valid")
	],
	put: [
		check("email").optional()
			.isEmail()
			.withMessage("Email format is not valid"),
		check("telephone").optional()
			.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
			.withMessage("Telephone number is not valid"),
		check("role").optional()
			.isIn(["patient", "healthstack", "lab agent"])
			.withMessage("Role must be either patient, healthstack, lab agent")
	],
};

exports.transactions = {
	put: [
		check('emailTransactionStatus').optional().isIn(['accepted', 'success', 'failed']).withMessage("Email Transaction status is suppose to be either created, accepted, success or failed"),
		check('smsTransactionStatus').optional().isIn(['accepted', 'success', 'failed']).withMessage("Sms Transaction status is suppose to be either created, accepted, success or failed")
	],
}
