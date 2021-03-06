if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
module.exports = {
	port: process.env.PORT,
	appEnv: process.env.NODE_ENV,
	centrePasteurYaoundeBucket: process.env.CENTRE_PASTEUR_YAOUNDE_BUCKET,
	awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
	awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	sessionSecret: process.env.SESSION_SECRET,
	region: process.env.REGION,
	senderEmail: process.env.SENDER_EMAIL,
	africasTalkingApiKey: process.env.AFRICAS_TALKING_API_KEY,
	africasTalkingApiUsername: process.env.AFRICAS_TALKING_USERNAME,
	redisPort: process.env.REDIS_PORT,
	redisHost: process.env.REDIS_HOST,
	redisPassword: process.env.REDIS_PASSWORD,
	dbUser: process.env.DATABASE_USER,
	dbUserPassword: process.env.DATABASE_USER_PASSWORD,
	db: process.env.DATABASE,
	dbHost: process.env.DATABASE_HOST,
	dbDialect: process.env.DATABASE_DIALECT
}
