const { organization } = require('../models');
const { validationResult } = require('express-validator/check');


exports.getOrganizationById = (req, res, next) => {
	organization.findOne({ where: { organizationId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) return res.status(404).json({err: 'Not Found'});
		return res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for organization failed';
		return next(err);
	})
};

exports.getOrganizations = (req, res, next) => {
	organization.findAll()
	.then(resp => {
		if(resp.length === 0) return res.status(404).json({err: 'Not Found'})
		return res.status(200).json(resp);
	}).catch(err => {
		err.status = 500;
		err.msg = 'Query for organizations failed';
		return next(err);
	});
};


exports.createOrganization = (req, res, next) => {
	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
	}

	organization.create({
		name: req.body.name,
		telephone: req.body.telephone,
		email: req.body.email,
		location: req.body.location,
		address: req.body.address,
		status: 'pending',
		category: req.body.category,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	.then(resp => {
		return res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization creation failed'
		return next(err);
	});
};


exports.updateOrganization = (req, res, next) => {
	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
	}

	organization.update(req.body, { returning: true, where: { organizationId: req.params.id }})
	.then(resp => {
		return res.status(200).json(resp[1]);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization update failed';
		return next(err);
	});
};

exports.deleteOrganizationById = (req, res, next) => {
	organization.destroy({ where: { organizationId: req.params.id }})
	.then(resp => {
		return res.status(200).json({ msg: 'Organization deletion was successful'});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization deletion failed';
		return next(err);
	})
};
