const express = require('express');
const multer = require('multer');
const { check, validationResult } = require("express-validator/check");
const { medicalresult, medicalresultfile, admin, patient } = require('../models');
const { uploadfiles } = require('../services/fileUploadService');
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

medicalResultRouter.post('/medicalresults', multerSetting.any(), uploadfiles, (req, res, next) => {
	medicalresult.create({
		adminId: req.session.user.admin.adminId,
		patientId: req.body.patientId,
		organizationId: req.session.user.admin.organizationId,
		medicalresultfiles: res.locals.uploadedFiles.map(file => {
			return {
				fileUrl: file,
				createdAt: new Date(),
				updatedAt: new Date()
			};
		}),
		createdAt: new Date(),
		updatedAt: new Date()
	}, { include: [ medicalresultfile ] })
	.then(medres => {
		res.status(200).json(medres);
		
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Failed to create medical result';
		next(err);
	});
});


medicalResultRouter.put('/medicalresults/:id', [
	check("adminId")
      .isUUID()
	  .withMessage("adminId should be UUID"),
	check("patientId")
      .isUUID()
	  .withMessage("patientId should be UUID"),
	check("organizationId")
      .isUUID()
	  .withMessage("organizationId should be UUID")
], (req, res, next) => {

	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
	}

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
