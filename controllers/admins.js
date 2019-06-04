const express = require("express");
const bcrypt = require("bcrypt");
const { user, admin } = require("../models");
const { check, validationResult } = require("express-validator/check");
const adminRouter = express.Router();
const SALT_ROUNDS = 10;

adminRouter.get("/admins", (req, res, next) => {
  admin
    .findAll({ include: [user], where: { role: "healthstack" } })
    .then(resp => {
      if (resp.length === 0) res.status(404).send({ msg: "Not Found" });
      res.status(200).send(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for admins failed";
      next(err);
    });
});

adminRouter.get("/admins/:id", (req, res, next) => {
  admin
    .findOne({ include: [user], where: { adminId: req.params.id } })
    .then(resp => {
      if (resp.length === 0) res.status(404).json({ err: "Not Found" });
      res.status(200).json(resp);
    })
    .catch(err => {
      err.status = 500;
      err.msg = "Query for admin failed";
      next(err);
    });
});

adminRouter.post(
  "/admins",
  [
    check("email")
      .isEmail()
      .withMessage("Email format is not valid"),
    check("telephone")
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
      .withMessage("Telephone number is not valid"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    req.body.status = "active";
    req.body.role = "healthstack";

    user
      .create(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          telephone: req.body.telephone,
          status: req.body.status,
          role: req.body.role,
          admin: {
            role: req.body.role,
            password: hash,
            organizationId: req.body.organizationId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          include: [admin]
        }
      )
      .then(resp => {
        res.status(200).json(resp);
      })
      .catch(err => {
        err.status = 500;
        err.msg = "Admin creation failed";
        next(err);
      });
  }
);

adminRouter.delete("/admins/:id", (req, res, next) => {
  admin
    .destroy({ where: { adminId: req.params.id } })
    .then(adminResp => {
      res.status(200).json({ msg: "Your delete was successfull"});
		}).catch(err => {
      err.status = 500;
      err.msg = "Query for Admin failed";
      next(err);
    });
});

adminRouter.put(
  "/admins/:id",
  [
    check("email").optional()
      .isEmail()
      .withMessage("Email format is not valid"),
    check("telephone").optional()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, "g")
      .withMessage("Telephone number is not valid"),
    check("password").optional()
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters"),
    check("organizationId").optional()
      .isUUID()
      .withMessage("OrganizationId must be a UUID"),
    check("role").optional()
      .isIn(["patient", "healthstack", "lab agent"])
      .withMessage("Role must be either patient, healthstack, lab agent"),
    check("status").optional()
      .isIn(["active", "pending"])
      .withMessage("Status must be either pending or active")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
	}
	
    admin
      .findOne({
        where: { adminId: req.params.id},
        include: [user]
      })
      .then(adminRes => {
        let newAdminData = {};
        let newUserData = {};
        if (req.body.firstName) newUserData.firstName = req.body.firstName;
        if (req.body.lastName) newUserData.lastName = req.body.lastName;
        if (req.body.email) newUserData.email = req.body.email;
        if (req.body.telephone) newUserData.telephone = req.body.telephone;
        if (req.body.status) newUserData.status = req.body.status;
        if (req.body.role) {
          newUserData.role = req.body.role;
          newAdminData.role = req.body.role;
        }
        if (Object.keys(newUserData).length != 0)
          newUserData.updatedAt = req.body.updatedAt;

        if (req.body.password) newAdminData.password = req.body.password;
        if (Object.keys(newAdminData).length != 0)
          newAdminData.updatedAt = req.body.updatedAt;

        return Promise.all([
          adminRes.updateAttributes(newAdminData),
          adminRes.user.map(userRes => {
            userRes.updateAttributes(newUserData);
          })
        ]);
      })
      .then(([adminRes, userRes]) => {
        adminRes.user = userRes;
        res.status(200).json(adminRes);
      })
      .catch(err => {
        err.status = 500;
        err.msg = "Admin update failed";
        next(err);
      });
  }
);

exports.adminRouter = adminRouter;
