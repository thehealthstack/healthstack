const express = require('express');
const smsHookRouter = express.Router();

smsHookRouter.post('/smshook', (req, res, next) => {
	console.log(req.body);
});

exports.smsHookRouter = smsHookRouter;
