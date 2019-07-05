const bcrypt = require("bcrypt");
const { user, admin } = require("../models");
const { validationResult } = require('express-validator/check');
const SALT_ROUNDS = 10;


exports.createLabAgent = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
		req.body.status = "pending";
		req.body.role = "lab agent";

		user
			.create(
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					telephone: req.body.telephone,
					status: req.body.status,
					role: req.body.role,
					admin: {
						password: hash,
						role: req.body.role,
						organizationId: req.body.organizationId,
						createdAt: new Date(),
						updatedAt: new Date()
					},
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					include: [admin]
				}
			)
			.then(resp => {
				return res.status(200).json(resp);
			})
			.catch(err => {
				err.status = 500;
				err.msg = "Agent creation failed";
				return next(err);
			});
};


exports.updateLabAgent = (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		admin
			.findOne({
				where: { adminId: req.params.id },
				include: [user]
			})
			.then(adminRes => {
				let newAdminData = {};
				let newUserData = {};
				if (req.body.firstName) newUserData.firstName = req.body.firstName;
				if (req.body.lastName) newUserData.lastName = req.body.lastName;
				if (req.body.email) newUserData.email = req.body.email;
				if (req.body.telephone) newUserData.telephone = req.body.telephone;
				if (req.body.status) newUserData.status = req.body.status;
				if (req.body.role) {
					newUserData.role = req.body.role;
					newAdminData.role = req.body.role;
				}
				if (Object.keys(newUserData).length != 0)
					newUserData.updatedAt = req.body.updatedAt;

				if (req.body.password) newAdminData.password = req.body.password;
				if (Object.keys(newAdminData).length != 0)
					newAdminData.updatedAt = req.body.updatedAt;

				return Promise.all([
					adminRes.update(newAdminData),
					adminRes.user.update(newUserData)
				]);
			})
			.then(([adminRes, userRes]) => {
				adminRes.user = userRes;
				return res.status(200).json(adminRes);
			})
			.catch(err => {
				err.status = 500;
				err.msg = "lab Agent update failed";
				return next(err);
			});
};

exports.deleteLabAgentById = (req, res, next) => {
	admin.destroy({ where: { adminId: req.params.id } })
		.then(adminResp => {
			return res.status(200).json({ msg: "Your delete was successfull"});
		})
		.catch(err => {
			err.status = 500;
			err.msg = "Query for agent failed";
			return next(err);
		});
};

exports.getLabAgents = (req, res, next) => {
	admin
		.findAll({ include: [user], where: { role: "lab agent" } })
		.then(resp => {
			if (resp.length === 0) return res.status(404).json({ err: "Not Found" });
			return res.status(200).json(resp);
		})
		.catch(err => {
			err.status = 500;
			err.msg = "Query for lab agents failed";
			return next(err);
		});
};

exports.getLabAgentById = (req, res, next) => {
	admin
		.findOne({ include: [user], where: { adminId: req.params.id } })
		.then(resp => {
			if (resp.length === 0) return res.status(404).json({ err: "Not Found" });
			return res.status(200).json(resp);
		})
		.catch(err => {
			err.status = 500;
			err.msg = "Query for lab agent failed";
			return next(err);
		});
};
