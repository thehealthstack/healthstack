const AWS = require('aws-sdk');
const template = require('./smsTemplate');


AWS.config.update({
	accessKeyId: "YOUR_ACCESS_KEY",
	secretAccessKey: "YOUR_ACCESS_KEY",
	region: 'eu-west-1'});


function setSmsParams(to){

   let params = {
	Message: template.message,
	PhoneNumber: to, //E.164_PHONE_NUMBER
  };
}


function publishSMS(to){
	return new AWS.SNS({apiVersion: '2010-03-31'}).publish(setSmsParams(to)).promise();
}

