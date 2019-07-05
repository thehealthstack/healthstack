const AWS = require('aws-sdk');
const { awsAccessKeyId, awsSecretAccessKey, region, senderEmail } = require('../config');

AWS.config.update({
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsSecretAccessKey,
	region: region });


const getTemplate = () => {
	// Create the promise and SES service object
	return new AWS.SES({apiVersion: '2010-12-01'}).getTemplate({TemplateName: 'MedicalResult'}).promise();

}

const createTemplate = () => {

	// Create createTemplate params
    let params = {
			Template: { 
			TemplateName: templateData.name,
			ConfigurationSetName: 'healthstack-sns-config',
			HtmlPart: templateData.htmlPart,
			SubjectPart: templateData.subject,
			TextPart: templateData.textPart
			}
  	};
  
  // Create the promise and SES service object
  return new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(params).promise();
  
}

const generateHtmlBody = (data) => {
	return `<h4>Hello</h4><br/>, <p>Here are the results of the exams you did at ${data.lab}:</p>${data.results}<br/><h4>Best,${data.lab}</h4>`;
};

const generateTextBody = (data) => {
	return `Hello,
	Here are the results of the exams you did at ${data.lab}:
	${data.results} 
	Best,
	${data.lab}`;
};

/*
* To: is an array of emails addresses to which the email should be sent.
*/
const setEmailParams = (to, templateData) => {

	let params = {
		Destination: {
			ToAddresses: to,
		},
		Source: senderEmail,
		Message: {
			Body: {
				Html: {
				 Charset: "UTF-8",
				 Data: generateHtmlBody(templateData)
				},
				Text: {
				 Charset: "UTF-8",
				 Data: generateTextBody(templateData)
				}
			 },
			 Subject: {
				Charset: 'UTF-8',
				Data: 'Medical Exam Result'
			 }
		},
		ConfigurationSetName: 'healthstack-email-configset'
	};

	return params;
}

const createSendEmailPromise = (to, templateData) => {
	return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(setEmailParams(to, templateData)).promise();
}

exports.getTemplate = getTemplate;
exports.createTemplate = createTemplate;
exports.setEmailParams = setEmailParams;
exports.createSendEmailPromise = createSendEmailPromise;

