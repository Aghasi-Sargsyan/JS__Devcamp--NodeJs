function withStatus(req, res, next){
	res.statusJson = (status, data)=> {
		res.status(status).json(data)
	};
	next();
}

module.exports = withStatus;