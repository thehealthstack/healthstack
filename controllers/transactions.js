const express = require('express');
const { transaction, medicalresult, patient } = require('transaction');
const transactionRouter = express.Router();



transactionRouter.get('/transactions', (req, res, next) => {

	if(!req.query){
		transaction.findAll({ include: [ medicalresult, patient ]})
		.then(resp => {
			if(resp.length === 0) res.status(404).send({ msg: 'Not Found'});
			res.status(200).send(resp);
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
				res.status(200).send(resp);
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
				res.status(200).send(resp);
			})
			.catch(err => {
				err.status = 500;
				err.msg = 'Query for transactions failed'
			});
		}
		
	}
	
});


exports.transactionRouter = transactionRouter;
