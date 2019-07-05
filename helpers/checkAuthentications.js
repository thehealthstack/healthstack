
exports.isLabAgent = (req, res, next) => {
	if(req.session){
		if(req.session.user){
			if(req.session.user.role === 'lab agent'){
				return next()
			}else{
				return res.status(401).json({ msg: "Not Authorized"});
			}
		}
	}
	return res.status(401).json({ msg: "Not Authorized"});
};

exports.isAdmin = (req, res, next) => {
	if(req.session){
		if(req.session.user){
			if(req.session.user.role === 'healthstack'){
				return next()
			}else{
				return res.status(401).json({ msg: "Not Authorized"});
			}
		}
	}
	return res.status(401).json({ msg: "Not Authorized"});
};

exports.isAdminOrLabAgent = (req, res, next) => {
	if(req.session){
		if(req.session.user){
			if(req.session.user.role === 'healthstack' || req.session.user.role === 'lab agent'){
				return next()
			}else{
				return res.status(401).json({ msg: "Not Authorized"});
			}
		}
	}
	return res.status(401).json({ msg: "Not Authorized"});
};
