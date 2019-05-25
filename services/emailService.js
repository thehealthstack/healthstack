const AWS = require('aws-sdk');
const templateData = require('./emailTemplate');

AWS.config.update({
	accessKeyId: "YOUR_ACCESS_KEY",
	secretAccessKey: "YOUR_ACCESS_KEY",
	region: 'eu-west-1'});


function getTemplate(){
	// Create the promise and SES service object
	return new AWS.SES({apiVersion: '2010-12-01'}).getTemplate({TemplateName: 'Medical Result'}).promise();

}

function createTemplate(){

	// Create createTemplate params
    let params = {
			Template: { 
			TemplateName: templateData.name,
			HtmlPart: templateData.htmlPart,
			SubjectPart: templateData.subject,
			TextPart: templateData.textPart
			}
  	};
  
  // Create the promise and SES service object
  return new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(params).promise();
  
}

/*
* To: is an array of emails addresses to which the email should be sent.
*/
function setEmailParams(to){

	let params = {
		Destination: {
			ToAddresses: to,
		},
		Source: templateData.senderEmail,
		Template: 'Medical Result',
		TemplateData: templateData
	};

	return params;
}

function createSendEmailPromise(to){
	return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(setEmailParams(to)).promise();
}
