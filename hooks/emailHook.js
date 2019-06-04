const express = require('express');
const { transaction } = require('../models');
const emailHookRouter = express.Router();


emailHookRouter.post('/emailhook', (req, res, next) => {
	let body = ''

	req.on('data', (chunk) => {
		body += chunk.toString()
	})

	req.on('end', () => {
		let payload = JSON.parse(body);
		let message = JSON.parse(payload.Message);

		if (payload.Type === 'SubscriptionConfirmation') {
			console.log(payload);
		}

		if (payload.Type === 'Notification') {
			
			if(message.eventType === 'Delivery'){
				//email transaction succeeded
				transaction.update({ emailTransactionStatus: 'success'}, { returning: true, where: { emailMessageId: message.messageId }})
				.then(resp => {
					res.status(200).json(resp[1]);
				})
				.catch(err => {
					err.status = 500;
					err.msg = 'Email Status update Failed';
					//Add logging for production.
				});
			}

			if(message.eventType === 'Bounce' || message.eventType === 'Reject' 
			|| message.eventType === 'Rendering Failure'){
				//email transaction failed
				transaction.update({ emailTransactionStatus: 'failed'}, { returning: true, where: { emailMessageId: message.messageId }})
				.then(resp => {
					res.status(200).json(resp[1]);
				})
				.catch(err => {
					err.status = 500;
					err.msg = 'Email Status update Failed';
					//Add logging for production.
				});
			}

		}
	});
  

});

exports.emailHookRouter = emailHookRouter;
