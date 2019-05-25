const AWS = require('aws-sdk');
const { awsAccessKeyId, awsSecretAccessKey, centrePasteurYaoundeBucket } = require('../config');

AWS.config.update({
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsSecretAccessKey,
	region: 'eu-west-1'});

let bucket = new AWS.S3({
    Bucket: centrePasteurYaoundeBucket
});

exports.uploadfiles = (req, res, next) => {
	let files = req.files;
	let uploadedFiles = [];
	files.map(file => {
		let params = {
			Bucket: awsConfig.centrePasteurYaoundeBucket,
        	Key: file.originalname,
        	Body: file.buffer,
        	ACL: 'public-read'
		};
		bucket.upload(params, (err, data) => {
			if(err){
				next(err);
			}else{
				uploadedFiles.push(data.Location);
			}
		});
	});
	req.body.uploadedFiles = uploadedFiles;
	next(req);
};

