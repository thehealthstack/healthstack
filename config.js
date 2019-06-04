const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	port: process.env.PORT,
	appEnv: process.env.NODE_ENV,
	centrePasteurYaoundeBucket: process.env.CENTRE_PASTEUR_YAOUNDE_BUCKET,
	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	sessionSecret: process.env.SESSION_SECRET,
	region: process.env.REGION,
	senderEmail: process.env.SENDER_EMAIL
}
