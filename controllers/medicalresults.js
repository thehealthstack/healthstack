const { medicalresult, medicalresultfile, admin, patient, user } = require('../models');
const { validationResult } = require('express-validator/check');

exports.getMedicalResults = (req, res, next) => {
	medicalresult.findAll({ include: [ {
		model: patient,
		include: [ user ]
	  }, admin, medicalresultfile ]})
	.then(resp => {
		if(resp.length === 0) return res.status(404).json({ msg: 'Not Found'});
		return res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for medical results failed';
		return next(err);
	});
};

exports.getMedicalResultById = (req, res, next) => {
	medicalresult.findOne({ include: [patient, admin, medicalresultfile ], where: { medicalResultId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) return res.status(404).json({ msg: 'Not Found'});
		return res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Query for medical result failed';
		return next(err);
	});
};

exports.createMedicalResult = (req, res, next) => {
	medicalresult.create({
		adminId: req.session.user.admin.adminId,
		patientId: req.body.patientId,
		organizationId: req.session.user.admin.organizationId,
		medicalresultfiles: req.body.files.map(file => {
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
		return res.status(200).json(medres);

	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Failed to create medical result';
		return next(err);
	});
};


exports.updateMedicalResult = (req, res, next) => {

	const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
	}

	medicalresult.update(req.body, { returning: true,  where: { medicalResultId: req.params.id }})
	.then(resp => {
		if(resp.length === 0) res.status(404).json({ msg: 'Not Found'});
		return res.status(200).json(resp);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Medical result update failed';
		return next(err);
	});
};

exports.deleteMedicalResultById = (req, res, next) => {
	medicalresult.destroy({ where: { medicalResultId: req.params.id }})
	.then(resp => {
		return res.status(200).json({ msg: 'Medical result deletion was successfull'});
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Deletion of medical result failed';
		return next(err);
	});
};
