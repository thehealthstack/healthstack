const express = require("express");
const bodyParser = require("body-parser");
const csurf = require('csurf');
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const multer = require('multer');
const redis = require("redis");
const redisStore = require('connect-redis')(session);
const { check, validationResult } = require('express-validator/check');
const labAgents = require("./controllers/labAgents");
const admins = require("./controllers/admins");
const medicalresults = require("./controllers/medicalresults");
const transactions = require("./controllers/transactions");
const organizations = require("./controllers/organizations");
const patients = require("./controllers/patients");
const { emailHook } = require("./hooks/emailHook");
const { smsHook } = require("./hooks/smsHook");
const auth = require("./controllers/auth");
const { uploadfiles } = require('./services/fileUploadService');
const { redisPort, redisPassword, redisHost, port, sessionSecret } = require("./config");
const { isAdmin, isAdminOrLabAgent } = require("./helpers/checkAuthentications");
const validations = require("./helpers/validations");

const storage = multer.memoryStorage();
const multerSetting = multer({ storage: storage });
const app = express();
const router = express.Router();
const redisClient = redis.createClient({
	host: redisHost,
	password: redisPassword,
	port: redisPort,
});

redisClient.on('error', function (err) {
	console.log('could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
	console.log('connected to redis successfully');
});

//=================================
// Session Initialization
//=================================

let sess = {
	secret: sessionSecret,
	name: 'sessID',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new redisStore({ client: redisClient })
};

if (app.get("env") === "production") {
	sess.cookie.secure = true;
}

//=================================
// Middleware
//=================================
const csrfMiddleware = csurf({
	cookie: true
});

app.use(helmet());
app.use(
	cors({
		origin: "https://www.healthstack.app",
		credentials: true,
	})
);
//app.use(csrfMiddleware);
app.use(session(sess));
if (app.get("env") === "development") app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//========================================
// Routes
//========================================
router.get("/api/getcsrftoken", function (req, res) {
		return res.json({ csrfToken: req.csrfToken() });
});
router.get("/api/", function (req, res){
	return res.status(200).json({"message": "up"});
});
router.route("/api/login").post(validations.auth.login, auth.login);

router.route("/api/logout").post(isAdminOrLabAgent, auth.logout);
router.route("/api/upload").post(multerSetting.any(), uploadfiles);
router.route("/api/labagents")
	.post(isAdmin, validations.labAgents.post, labAgents.createLabAgent)
	.get(isAdmin, labAgents.getLabAgents);
router.route("/api/labagents/:id")
	.get(isAdminOrLabAgent, labAgents.getLabAgentById)
	.put(isAdminOrLabAgent, validations.labAgents.put, labAgents.updateLabAgent)
	.delete(isAdmin, labAgents.deleteLabAgentById);
router.route("/api/admins")
	.post(isAdmin, validations.admins.post, admins.createAdmin)
	.get(isAdmin, admins.getAdmins);
router.route("/api/admins/:id")
	.get(isAdmin, admins.getAdminById)
	.put(isAdmin, validations.admins.put, admins.updateAdmin)
	.delete(isAdmin, admins.deleteAdminById);
router.route("/api/medicalresults")
	.get(isAdminOrLabAgent, medicalresults.getMedicalResults)
	.post(isAdminOrLabAgent, medicalresults.createMedicalResult);
router.route("/api/medicalresults/:id")
	.get(isAdminOrLabAgent, medicalresults.getMedicalResultById)
	.put(isAdminOrLabAgent, validations.medicalresults.put, medicalresults.updateMedicalResult)
	.delete(isAdminOrLabAgent, medicalresults.deleteMedicalResultById);
router.route("/api/transactions")
	.post(isAdminOrLabAgent, transactions.createTransaction)
	.get(isAdminOrLabAgent, transactions.getTransactions);
router.route("api/transactions/:id")
	.get(isAdminOrLabAgent, transactions.getTransactionById)
	.put(isAdminOrLabAgent, validations.transactions.put, transactions.updateTransaction)
	.delete(isAdminOrLabAgent, transactions.deleteTransactionById);
router.route("/api/organizations")
	.post(isAdmin, validations.organizations.post, organizations.createOrganization)
	.get(organizations.getOrganizations);
router.route("/api/organizations/:id")
	.get(organizations.getOrganizationById)
	.put(isAdminOrLabAgent, validations.organizations.put, organizations.updateOrganization)
	.delete(isAdmin, organizations.deleteOrganizationById);
router.route("/api/patients")
	.get(isAdminOrLabAgent, patients.getPatients)
	.post(isAdminOrLabAgent, validations.patients.post, patients.createPatient); 
router.route("/api/patients/:id")
	.get(isAdminOrLabAgent, patients.getPatientById)
	.put(isAdminOrLabAgent, validations.patients.put, patients.updatePatient)
	.delete(isAdminOrLabAgent, patients.deletePatientById);
router.route("/api/email/")
	.post(emailHook);
router.route("/api/sms/")
	.post(smsHook);

// Mount router
app.use('/', router);

//======================================
// Error Handling middleware
//=======================================
// Handle File Not Found Error(404)
app.use(function(req, res, next) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
});

if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		console.log(err);
		res.status(err.status || 500).json(err.msg);
	});
}

app.listen(port, () => console.log(`HealthStack is listening on port ${port}!`));
