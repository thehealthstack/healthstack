const AWS = require('aws-sdk');
const { awsAccessKeyId, awsSecretAccessKey, centrePasteurYaoundeBucket, region } = require('../config');

AWS.config.update({
	accessKeyId: awsAccessKeyId,
	secretAccessKey: awsSecretAccessKey,
	region: region });

let bucket = new AWS.S3({
		Bucket: centrePasteurYaoundeBucket
});

exports.uploadfiles = (req, res, next) => {
	let files = req.files;

	Promise.all(files.map(file => {
		let params = {
			Bucket: centrePasteurYaoundeBucket,
					Key: file.originalname,
					Body: file.buffer,
					ACL: 'public-read'
		};

		return bucket.upload(params).promise();
	}))
	.then(uploadedObjects => {
		let uploadedFiles = uploadedObjects.map(fileObject => fileObject.Location);
		res.json(uploadedFiles);
	})
	.catch(err => {
		err.status = 500;
		err.msg = 'Could not upload file to AWS';
		next(err);
	});
};
