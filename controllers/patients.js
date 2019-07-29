const { user, patient } = require("../models");
const { validationResult } = require("express-validator/check");

exports.getPatientById = (req, res, next) => {
  patient
    .findOne({ include: [user], where: { patientId: req.params.id } })
    .then(resp => {
      if (resp.length === 0) return res.status(404).json({ err: "Not Found" });
      return res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patient failed";
      return next(err);
    });
};

exports.getPatients = (req, res, next) => {
  patient
    .findAll({ include: [user] })
    .then(resp => {
      if (resp.length === 0) return res.status(404).json({ err: "Not Found" });
      return res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patients failed";
      return next(err);
    });
};

exports.deletePatientById = (req, res, next) => {
  patient
    .destroy({ where: { patientId: req.params.id } })
    .then(patientResp => {
      return res.status(200).json({ msg: "Your delete was successfull" });
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patient failed";
      return next(err);
    });
};

exports.createPatient = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  req.body.status = "pending";
  req.body.role = "patient";
  
  user
		.findOne({ where: { telephone: req.body.telephone }, include: [{ model: patient }] })
		.then(searchRes => {
			if(searchRes !== null){
				return res.status(200).json(searchRes.dataValues);
			}
      
			return user.create({
				firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        status: req.body.status,
				role: req.body.role,
				telephone: req.body.telephone,
				createdAt: new Date(),
        updatedAt: new Date(),
				patient: {
					createdAt: new Date(),
					updatedAt: new Date()
				},
			}, { include: [ patient ]})
		})
    .then((userRes) => {
      return res.status(200).json(userRes.dataValues);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Patient creation failed";
      return next(err);
    });
};

exports.updatePatient = (req, res, next) => {
  patient
    .findOne({ where: { patientId: req.params.id }, include: [user] })
    .then(patientRes => {
      if (patientRes.length === 0) res.status(404).json({ msg: "Not Found" });

      user
        .update(req.body, {
          returning: true,
          where: { userId: patientRes.userId }
        })
        .then(resp => {
          return res.status(200).json(resp[1]);
        })
        .catch(err => {
          err.status = 500;
          err.msg = "Patient update failed";
          return next(err);
        });
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Patient update failed";
      return next(err);
    });
};
