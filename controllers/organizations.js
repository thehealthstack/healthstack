const express = require('express');
const { check, validationResult } = require('express-validator/check');
const organizationRouter = express.Router();
const { organization } = require('../models');


organizationRouter.get('/organizations/:id', (req, res, next) => {
	organization.findOne({ where: { organizationId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({err: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for organization failed';
		next(err);
	})
});

organizationRouter.get('/organizations', (req, res, next) => {
	organization.findAll()
	.then(resp => {
		if(resp.length === 0) res.status(404).json({err: 'Not Found'})
		res.status(200).json(resp);
	}).catch(err => {
		err.status = 500;
		err.msg = 'Query for organizations failed';
		next(err);
	});
});

organizationRouter.post('/organizations', [
	check('telephone').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
	check('email').isEmail().withMessage('Email format not valid')
], (req, res, next) => {
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
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization creation failed'
		next(err);
	});
});

organizationRouter.put('/organizations/:id', [
	check('telephone').optional().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
	check('email').optional().isEmail().withMessage('Email format not valid')
], (req, res, next) => {
	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	return res.status(400).json({ errors: errors.array() });
	}
	
	organization.update(req.body, { returning: true, where: { organizationId: req.params.id }})
	.then(resp => {
		res.status(200).json(resp[1]);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization update failed';
		next(err);
	});
});

organizationRouter.delete('/organizations/:id', (req, res, next) => {
	organization.destroy({ where: { organizationId: req.params.id }})
	.then(resp => {
		res.status(200).json({ msg: 'Organization deletion was successful'});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Organization deletion failed';
		res.status(500).json(err);
	})
});

exports.organizationRouter = organizationRouter;
