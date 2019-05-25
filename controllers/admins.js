const express = require('express');
const bcrypt = require('bcrypt');
const { user, admin } = require('../models');
const { check, validationResult } = require('express-validator/check');
const adminRouter = express.Router();
const SALT_ROUNDS = 10;


adminRouter.get('/admins', (req, res, next) => {
	admin.findAll({ include: [ user ], where: { role: 'healthstack'}})
	.then(resp => {
		if(resp.length === 0) res.status(404).send({ msg: 'Not Found'});
		res.status(200).send(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for admins failed';
		next(err);
	})
});

adminRouter.get('/admins/:id', (req, res, next) => {
	admin.findOne({ include: [ user ], where: { adminId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({err: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for admin failed';
		next(err);
	});
});

adminRouter.post('/admins',[
	check('email').isEmail().withMessage('Email format is not valid'),
	check('telephone').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,'g').withMessage('Telephone number is not valid'),
	check('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
	], (req, res, next) => {
	const errors = validationResult(req);
  	if (!errors.isEmpty()) {
    	return res.status(400).json({ errors: errors.array() });
	}

	let hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
	req.body.status = 'active';
	req.body.role = 'healthstack';

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
		err.msg = 'Admin creation failed';
		next(err);
	});
});

adminRouter.delete('/admins/:id', (req, res, next) => {
	admin.findOne({ where : { adminId: req.params.id }})
	.then(adminResp => {
		user.destroy({ where: { userId: adminResp[0].userId }})
		.then(userResp => {
			admin.destroy({ where: {
				adminId: adminResp[0].adminId
			}})
			.then(resp => {
				res.status(200).json({msg: 'Admin deletion was successful'});
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Admin deletion failed';
				next(err);
			})
		})
		.catch(err => {
			err.status = 500;
			err.msg = 'Admin deletion failed';
			next(err);
		})
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for Admin failed';
		next(err);
	});

});


adminRouter.update('/admins/:id', (req, res, next) => {
//implement admin update callback
});

exports.adminRouter = adminRouter;
