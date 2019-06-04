
exports.isLabAgent = (req, res, next) => {
	if(req.session.user){
		if(req.session.user.role === 'lab agent'){
			next()
		}else{
			let err = new Error('Not authorized');
			err.status = 401;
			next(err);
		}
	}
	let err = new Error('Forbidden');
	err.status = 403;
	next(err);
};

exports.isAdmin = (req, res, next) => {
	if(req.session.user){
		if(req.session.user.role === 'healthstack'){
			next()
		}else{
			let err = new Error('Not authorized');
			err.status = 401;
			next(err);
		}
	}
	let err = new Error('Forbidden');
	err.status = 403;
	next(err);
};

exports.isAdminOrLabAgent = (req, res, next) => {
	if(req.session.user){
		if(req.session.user.role === 'healthstack' || req.session.user.role === 'lab agent'){
			next()
		}else{
			let err = new Error('Not authorized');
			err.status = 401;
			next(err);
		}
	}
	let err = new Error('Forbidden');
	err.status = 403;
	next(err);
};
