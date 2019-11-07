function asyncHandler(asyncFn) {
	return function (req, res, next) {
		Promise.resolve(asyncFn(req, res, next)).catch(next);
	}
}

module.exports = asyncHandler;