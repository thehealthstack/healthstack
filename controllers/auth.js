const { user, admin, organization } = require('../models');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

exports.login = (req, res, next) => {

	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
	}

	let email = req.body.email;
	let password = req.body.password;

	user.findOne({ where: {
		email: email
	}, include: [ {model: admin, include: [ organization ]}]})
	.then(userResp => {
		if(userResp.dataValues){
			if(bcrypt.compareSync(password, userResp.dataValues.admin.dataValues.password)){
				req.session.user = userResp.dataValues;
				return res.status(200).json(req.session);
			} else {
				return res.status(401).send({msg: 'Email/Password incorrect'});
			}
		}else{
			return res.status(401).send({msg: 'Your are not authorized'});
		}
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Login Failed';
		return next(err);
	});
};


exports.logout = (req, res, next) => {
	req.session.destroy(function(err) {
		if(err){
			return next(err);
		}
		return res.status(200).json({msg: 'Logout successfull'});
	});
};
