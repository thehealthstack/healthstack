const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const redis = require("redis");
const redisStore = require('connect-redis')(session);
const { labAgentRouter } = require("./controllers/labAgents");
const { adminRouter } = require("./controllers/admins");
const { medicalResultRouter } = require("./controllers/medicalresults");
const { transactionRouter } = require("./controllers/transactions");
const { organizationRouter } = require("./controllers/organizations");
const { patientRouter } = require("./controllers/patients");
const { emailHookRouter } = require("./hooks/emailHook");
const { smsHookRouter } = require("./hooks/smsHook");
const { authRouter } = require("./controllers/auth");
const { port, sessionSecret } = require("./config");
const { isAdmin, isAdminOrLabAgent } = require("./helpers/checkAuthentications");

const app = express();
const redisClient = redis.createClient();

//=================================
// Session Initialization
//=================================
let sess = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
	cookie: {},
	store: new redisStore({ host: 'localhost', port: '6379', client: redisClient })
};

if (app.get("env") === "production") {
  sess.cookie.secure = true;
}

//=================================
// Middleware
//=================================
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);
app.use(session(sess));
if (app.get("env") === "development") app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//========================================
// Routes
//========================================
app.use("/api/", isAdminOrLabAgent, labAgentRouter);
app.use("/api/", isAdmin, adminRouter);
app.use("/api/", isAdminOrLabAgent, medicalResultRouter);
app.use("/api/", isAdminOrLabAgent, transactionRouter);
app.use("/api/", isAdminOrLabAgent, organizationRouter);
app.use("/api/", isAdminOrLabAgent, patientRouter);
app.use("/api/", authRouter);
app.use("/", emailHookRouter);
app.use("/", smsHookRouter);

//======================================
// Error Handling middleware
//=======================================
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json(err.msg);
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err.msg);
});

app.listen(port, () => console.log(`HealthStack is listening on port ${port}!`));
