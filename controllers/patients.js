const express = require("express");
const { check, validationResult } = require("express-validator/check");
const { user, patient } = require("../models");
const patientRouter = express.Router();

patientRouter.get("/patients/:id", (req, res, next) => {
  patient
    .findOne({ include: [user], where: { patientId: req.params.id } })
    .then(resp => {
      if (resp.length === 0) res.status(404).json({ err: "Not Found" });
      res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patient failed";
      next(err);
    });
});

patientRouter.get("/patients", (req, res, next) => {
  patient
    .findAll({ include: [user] })
    .then(resp => {
      if (resp.length === 0) res.status(404).json({ err: "Not Found" });
      res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patients failed";
      next(err);
    });
});

patientRouter.delete("/patients/:id", (req, res, next) => {
  patient
    .destroy({ where: { patientId: req.params.id } })
    .then(patientResp => {
      res.status(200).json({ msg: "Your delete was successfull"});
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for patient failed";
      next(err);
    });
});

patientRouter.post(
  "/patients",
  [
    check("email")
      .isEmail()
      .withMessage("Email format is not valid"),
    check("telephone")
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
      .withMessage("Telephone is not valid")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body.status = "pending";
    req.body.role = "patient";

		//Change this to find or create
    user
      .create(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          telephone: req.body.telephone,
          status: req.body.status,
          role: req.body.role,
          patient: {
            createdAt: new Date(),
            updatedAt: new Date()
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          include: [patient]
        }
      )
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        err.status = 500;
        err.msg = "Patient creation failed";
        next(err);
      });
  }
);

patientRouter.put(
  "/patients/:id",
  [
    check("email").optional()
      .isEmail()
      .withMessage("Email format is not valid"),
    check("telephone").optional()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
      .withMessage("Telephone number is not valid"),
    check("role").optional()
      .isIn(["patient", "healthstack", "lab agent"])
      .withMessage("Role must be either patient, healthstack, lab agent")
  ],
  (req, res, next) => {
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
            res.status(200).json(resp[1]);
          })
          .catch(err => {
            err.status = 500;
            err.msg = "Patient update failed";
            next(err);
          });
      })
      .catch(err => {
        err.status = 500;
        err.msg = "Patient update failed";
        next(err);
      });
  }
);

exports.patientRouter = patientRouter;
