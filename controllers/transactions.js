const { transaction, medicalresult, patient, user } = require("../models");
const smsService = require("../services/smsService");
const emailService = require("../services/emailService");
const { validationResult } = require("express-validator/check");

exports.getTransactions = (req, res, next) => {
  transaction
    .findAll({
      include: [
        {
          model: medicalresult,
          include: [{ model: patient, include: [user] }]
        }
      ]
    })
    .then(resp => {
      if (resp.length === 0) return res.status(404).json({ msg: "Not Found" });
      return res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for transactions failed";
      return next(err);
    });
};

exports.getTransactionById = (req, res, next) => {
  transaction
    .findOne({ where: { transactionId: req.params.id } })
    .then(resp => {
      if (resp.length === 0) return res.status(404).send({ msg: "Not Found" });
      return res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for transactions failed";
      return next(err);
    });
};

exports.deleteTransactionById = (req, res, next) => {
  transaction
    .destroy({ where: { transactionId: req.params.id } })
    .then(resp => {
      return res.status(200).json({ msg: "Your delete was successfull" });
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Transaction delete failed";
      return next(err);
    });
};

exports.updateTransaction = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  transaction
    .update(req.body, {
      returning: true,
      where: { transactionId: req.params.id }
    })
    .then(resp => {
      return res.status(200).json(resp[1]);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Transaction update failed";
      return next(err);
    });
};

exports.createTransaction = (req, res, next) => {
  let smsText = smsService.generateSmsText(
    req.session.user.admin.organization.name,
    req.body.resultFiles
  );
  Promise.all([
    smsService.publishSMS(
      req.body.recipientPhoneNumber,
      smsText,
      smsService.setSmsParams
    ),
    emailService.createSendEmailPromise(req.body.recipientEmailAddresses, {
      results: req.body.resultFiles.join(", "),
      lab: req.session.user.admin.organization.name
    })
  ])
    .then(values => {
      console.log(values);
      transaction
        .create({
          emailTransactionStatus: "accepted",
          smsTransactionStatus: "accepted",
          patientId: req.body.patientId,
          medicalResultId: req.body.medicalResultId,
          adminId: req.session.user.admin.adminId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .then(resp => {
          return res.status(200).json(resp);
        })
        .catch(err => {
          err.status = 500;
          err.msg = "Transaction creation failed";
          return next(err);
        });
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Sms and Email push failed";
      return next(err);
    });
};
