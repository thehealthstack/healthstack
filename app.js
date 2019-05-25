const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const { labAgentRouter } = require('./controllers/labAgents');
const { adminRouter } = require('./controllers/admins');
const { medicalResultRouter } = require('./controllers/medicalresults');
const { transactionRouter } = require('./controllers/transactions');
const { organizationRouter } = require('./controllers/organizations');
const { patientRouter } = require('./controllers/patients');

const { port } = require('./config');
const app = express();

//=================================
// Middleware
//=================================
app.use(helmet());
if(app.get('env') === 'development') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//========================================
// Routes
//========================================
app.use('/', labAgentRouter);
app.use('/', adminRouter);
app.use('/', medicalResultRouter);
app.use('/', transactionRouter);
app.use('/', organizationRouter);
app.use('/', patientRouter);


//======================================
// Error Handling middleware
//=======================================
if(app.get('env') === 'development'){
	app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).send(err.msg);
	});
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500).send(err.msg);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
