const express = require('express');
const multer = require('multer');
const { medicalresult, medicalresultfile, admin, patient } = require('../models');
const { uploadfiles } = require('./services/fileUploadService');
const medicalResultRouter = express.Router();
const storage = multer.memoryStorage();
const multerSetting = multer({ storage: storage });

medicalResultRouter.get('/medicalresults', (req, res, next) => {
	medicalresult.findAll({ include: [patient, admin, medicalresultfile ]})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for medical results failed';
		next(err);
	});
});

medicalResultRouter.get('/medicalresults/:id', (req, res, next) => {
	medicalresult.findOne({ include: [patient, admin, medicalresultfile ], where: { medicalResultId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for medical result failed';
		next(err);
	});
});

medicalResultRouter.post('/medicalresults', multerSetting.any(), uploadfiles);

medicalResultRouter.post('/medicalresults', (req, res, next) => {
	medicalresult.create({
		adminId: req.body.adminId,
		patientId: req.body.patientId,
		organizationId: req.body.organizationId,
		medicalresultfiles: req.body.uploadedFiles,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	.then(medres => {
		transaction.create({
			emailTransactionStatus: 'created',
			smsTransactionStatus: 'created',
			patientId: resp[0].patientId,
			medicalResultId: resp[0].medicalResultId,
			adminId: resp[0].adminId,
			createdAt: new Date(),
			updatedAt: new Date()
		})
		.then(resp => {
			//Push email and sms to Amazon
		})
		.catch(err => {
			err.status = 500;
			err.msg = 'Transaction creation failed'
			next(err);
		});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Failed to create medical result entity';
		next(err);
	});
});

medicalResultRouter.put('/medicalresults/:id', (req, res, next) => {
	medicalresult.update(req.body, { returning: true,  where: { medicalResultId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
		res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Medical result update failed';
		next(err);
	});
});

medicalResultRouter.delete('/medicalresults/:id', (req, res, next) => {
	medicalresult.destroy({ where: { medicalResultId: req.params.id }})
	.then(resp => {
		res.status(200).json({ msg: 'Medical result deletion was successfull'});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Deletion of medical result failed';
		next(err);
	});
});


exports.medicalResultRouter = medicalResultRouter;
