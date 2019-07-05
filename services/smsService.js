const { africasTalkingApiKey, africasTalkingApiUsername } = require('../config');
const AfricasTalking = require('africastalking')({
	apiKey: africasTalkingApiKey,
	username: africasTalkingApiUsername
});

const smsService = AfricasTalking.SMS;

exports.setSmsParams = (to, smsText) => {
	return {
		to: to,
		message: smsText,
	};
};

exports.generateSmsText = (lab, results) => {
  return "Hello, Hope you are enjoying your time. Here are the results of the \n exams you did at " + lab + ":\n" + resultLinks + "\nBest,\n" + lab;
};

exports.publishSMS = (to, smsText, setSmsParams) => {
  return smsService.send(setSmsParams(to, smsText));
};

