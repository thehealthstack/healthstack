const express = require('express');
const { transaction, medicalresult, patient } = require('../models');
const { check, validationResult } = require("express-validator/check");
const smsService = require('../services/smsService');
const emailService = require('../services/emailService');
const transactionRouter = express.Router();



transactionRouter.get('/transactions', (req, res, next) => {

	if(!req.query){
		transaction.findAll({ include: [ medicalresult, patient ]})
		.then(resp => {
			if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
			res.status(200).json(resp);
		})
		.catch(err => {
			err.status = 500;
			err.msg = 'Query for transactions failed';
			next(err);
		});
	}else{
		if(req.query.email){
			transaction.findAll({ include: [ medicalresult, patient ], where: { email: req.query.email }})
			.then(resp => {
				if(resp.length === 0) res.status(404).send({ msg: 'Not Found'});
				res.status(200).json(resp);
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Query for transactions failed'
			});
		}

		if(req.query.telephone){
			transaction.findAll({ include: [ medicalresult, patient ], where: { telephone: req.query.telephone }})
			.then(resp => {
				if(resp.length === 0) res.status(404).send({ msg: 'Not Found'});
				res.status(200).json(resp);
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Query for transactions failed'
			});
		}
		
	}
	
});

transactionRouter.get('/transactions/:id', (req, res, next) => {
	transaction.findOne({ where: { transactionId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).send({ msg: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for transactions failed';
	});
});

transactionRouter.delete('/transactions/:id', (req, res, next) => {
	transaction.destroy({ where: { transactionId: req.params.id }})
	.then(resp => {
		res.status(200).json({ msg: 'Your delete was successfull'});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Transaction delete failed';
	});
});

transactionRouter.put('/transactions/:id', [
	check('emailTransactionStatus').optional().isIn(['accepted', 'success', 'failed']).withMessage("Email Transaction status is suppose to be either created, accepted, success or failed"),
	check('smsTransactionStatus').optional().isIn(['accepted', 'success', 'failed']).withMessage("Sms Transaction status is suppose to be either created, accepted, success or failed")
], (req, res, next) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
	}
	
	transaction.update(req.body, { returning: true, where: { transactionId: req.params.id }})
	.then(resp => {
		res.status(200).json(resp[1]);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Transaction update failed';
		next(err);
	});
});

transactionRouter.post('/transactions', (req, res, next) => {
	let smsText = smsService.generateSmsText(req.session.user.admin.organization.name, req.body.resultFiles);
		Promise.all([
			smsService.publishSMS(req.body.recipientPhoneNumber, smsText),
			emailService.createSendEmailPromise(req.body.recipientEmailAddresses, { results: req.body.resultFiles.join(), lab: req.session.user.admin.organization.name })
		])
		.then(values => {
			console.log(values);
			transaction.create({
				emailTransactionStatus: 'accepted',
				smsTransactionStatus: 'accepted',
				patientId: req.body.patientId,
				medicalResultId: req.body.medicalResultId,
				adminId: req.session.user.admin.adminId,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.then(resp => {
				res.status(200).json(resp);
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Transaction creation failed'
				next(err);
			});
		})
		.catch(err => {
			err.status = 500;
			err.msg = 'Sms and Email push failed';
			next(err);
		})
});

exports.transactionRouter = transactionRouter;
