const AWS = require("aws-sdk");
const { awsAccessKeyId, awsSecretAccessKey, region } = require('../config');

AWS.config.update({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: region
});

const setSmsParams = (to, smsText) => {
  let params = {
	MessageAttributes: {
		'AWS.SNS.SMS.SMSType': {
		   DataType: 'String',
		   StringValue: 'Transactional'
		}
	},
    Message: smsText,
    PhoneNumber: to //E.164_PHONE_NUMBER
  };
  return params;
}

const generateSmsText = (lab, results) => {
  resultLinks = "";
  for (let result of results) {
    resultLinks = results + "\n";
  }

  return `
	Hello,
	Hope you are enjoying your time. Here are the results of the 
	exams you did at ${lab}:
	${resultLinks}
	Best,
	${lab}
	`;
}

const publishSMS = (to, smsText) => {
  return new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(setSmsParams(to, smsText))
    .promise();
}

exports.setSmsParams = setSmsParams;
exports.generateSmsText = generateSmsText;
exports.publishSMS = publishSMS;
