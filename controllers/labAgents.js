const express = require('express');
const bcrypt = require('bcrypt');
const { user, admin } = require('../models');
const { check, validationResult } = require('express-validator/check');
const labAgentRouter = express.Router();
const SALT_ROUNDS = 10;

labAgentRouter.post('/labagents',[
	check('email').isEmail().withMessage('Email format is not valid'),
	check('telephone').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
	check('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
	], (req, res, next) => {
	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	return res.status(400).json({ errors: errors.array() });
	}

	let hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
	req.body.status = 'pending';
	req.body.role = 'lab agent';

	user.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		telephone: req.body.telephone,
		status: req.body.status,
		role: req.body.role,
		admin: {
			password: hash,
			organizationId: req.body.organizationId,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		createdAt: new Date(),
		updatedAt: new Date()
	}, {
		include: [admin]
	}).then(resp => {
		res.status(200).json(resp);
	}).catch(err => {
		err.status = 500;
		err.msg = 'Agent creation failed';
		next(err);
	});
});


//this method is to be reviewed
labAgentRouter.put('/labagents/:id', [
	check('email').isEmail().withMessage('Email format is not valid'),
	check('telephone').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
	check('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
], (req, res, next) => {
	admin.update(req.body, { returning: true, where: { patientId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Patient update failed'
		next(err);
	});
});


labAgentRouter.delete('/labagents/:id', (req, res, next) => {
	admin.findOne({ where : { adminId: req.params.id }})
	.then(adminResp => {
		user.destroy({ where: { userId: adminResp[0].userId }})
		.then(userResp => {
			admin.destroy({ where: {
				adminId: adminResp[0].adminId
			}})
			.then(resp => {
				res.status(200).json({msg: 'Agent deletion was successful'});
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Agent deletion failed';
				next(err);
			})
		})
		.catch(err => {
			err.status = 500;
			err.msg = 'Agent deletion failed';
			next(err);
		})
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for agent failed';
		next(err);
	});

});

labAgentRouter.get('/labagents', (req, res, next) => {
	admin.findAll({ include: [ user ], where: { role: 'lab agent'}})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({err: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for lab agents failed';
		next(err);
	});
});

labAgentRouter.get('/labagents/:id', (req, res, next) => {
	admin.findOne({ include: [ user ], where: { adminId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({err: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for lab agent failed';
		next(err);
	});
});

exports.labAgentRouter = labAgentRouter;
