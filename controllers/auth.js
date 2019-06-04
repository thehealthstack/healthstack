const express = require('express');
const { user, admin } = require('../models');
const bcrypt = require('bcrypt');
const authRouter = express.Router();


authRouter.post('/login', [
	check("email")
      .isEmail()
      .withMessage("Email format is not valid"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters")
], (req, res, next) => {

	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
	}
	
	let email = req.body.email;
	let password = req.body.password;

	user.findOne({ where: {
		email: email,
		role: 'lab agent'
	}, include: [ admin, organization ]})
	.then(userResp => {
		if(userResp[0]){
			if(bcrypt.compareSync(password, userResp[0].admin[0].password)){
				req.session.user = userResp[0];
				res.status(200).json(req.session.user);
			} else {
				res.status(401).send({msg: 'Email/Password incorrect'});
			}
		}else{
			res.status(401).send({msg: 'Your are not authorized'});
		}
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Login Failed';
		next(err);
	});
});


authRouter.post('/logout', (req, res, next) => {
	req.session.destroy(function(err) {
		if(err){
			next(err);
		}
		res.status(200).json({msg: 'Logout successfull'});
	});
});

exports.authRouter = authRouter;
